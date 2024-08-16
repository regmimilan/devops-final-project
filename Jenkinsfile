pipeline {
    agent any

    environment {
        // Define environment variables for Docker and Kubernetes
        DOCKER_IMAGE = 'srijeshk/devops-final-project-frontend:latest'
        KUBECONFIG = credentials('9d12d529-58af-49af-8799-e37c0ff380f6') // The ID of the kubeconfig credentials 
    }

    stages {
        stage('Checkout') {
            steps {
                // Checkout code from GitHub
                git branch: 'devops-project', url: 'https://github.com/regmimilan/devops-final-project.git'
            }
        }
        stage('Set up Node.js') {
            steps {
                script {
                    // Use nvm to install and use Node.js
                    bat '"C:\\Program Files (x86)\\nvm\\nvm.exe" install 20'
                    bat '"C:\\Program Files (x86)\\nvm\\nvm.exe" use 20'
                }
            }
        }
        stage('Install Dependencies') {
            steps {
                // Install npm dependencies
                bat 'npm ci'
            }
        }
        stage('Build') {
            steps {
                // Run the build script
                bat 'npm run build --if-present'
            }
        }
        stage('Test') {
            steps {
                // Run tests
                bat 'npm test'
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    // Build Docker image
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
                    bat '''
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
