pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                // Checkout code from GitHub
                git branch: 'devops-project', url: 'https://github.com/regmimilan/devops-final-project.git'
            }
        }
        stage('Set up Node.js') {
            steps {
                // Set up Node.js and install dependencies
                script {
                    // Set up Node.js version 20.x
                    sh 'nvm install 20'
                    sh 'nvm use 20'
                }
            }
        }
        stage('Install Dependencies') {
            steps {
                // Install npm dependencies
                sh 'npm ci'
            }
        }
        stage('Build') {
            steps {
                // Run the build script
                sh 'npm run build --if-present'
            }
        }
        stage('Test') {
            steps {
                // Run tests
                sh 'npm test'
            }
        }
        stage('Build Docker Image') {
            steps {
                // Build Docker image
                script {
                    docker.build('srijeshk/devops-final-project-frontend:latest')
                }
            }
        }
        stage('Push Docker Image') {
            steps {
                script {
                    // Log in to Docker Hub and push Docker image
                    docker.withRegistry('https://index.docker.io/v1/', 'docker-hub-credentials') {
                        docker.image('srijeshk/devops-final-project-frontend:latest').push('latest')
                    }
                }
            }
        }
        stage('Deploy to Kubernetes') {
            steps {
                script {
                    sh '''
                        kubectl apply -f k8s/configmap.yml --validate=false
                        kubectl apply -f k8s/deployment.yml --validate=false
                        kubectl apply -f k8s/service.yml --validate=false
                        kubectl get all
                    '''
                }
            }
        }
    }

    post {
        always {
            // Archive build artifacts
            archiveArtifacts artifacts: 'build/**/*', allowEmptyArchive: true
        }
        success {
            echo 'Build, Tests, and Deployment Successful!'
        }
        failure {
            echo 'Build, Tests, or Deployment Failed!'
        }
    }
}
