pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                // Checkout code from GitHub
                git branch: 'master', url: 'https://github.com/regmimilan/devops-final-project.git'
            }
        }
        stage('Install Dependencies') {
            steps {
                // Install npm dependencies
                bat 'npm install'
            }
        }
        stage('Build') {
            steps {
                // Run the build script
                bat 'npm run build'
            }
        }
        stage('Test') {
            steps {
                // Run tests
                bat 'npm test -- --passWithNoTests'
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    docker.build('srijeshk/devops-final-project-frontend:latest')
                }
            }
        }
        stage('Push Docker Image') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', 'docker-hub-credentials') {
                        docker.image('srijeshk/devops-final-project-frontend:latest').push('latest')
                    }
                }
            }
        }
        stage('Deploy to Kubernetes') {
            steps {
                withKubeConfig([credentialsId: 'kubeconfig-id']) {
                    sh '''
                        kubectl apply -f k8s/deployment.yml
                        kubectl apply -f k8s/service.yml
                        kubectl apply -f k8s/configmap.yml
                        kubectl apply -f k8s/hpa.yml
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
