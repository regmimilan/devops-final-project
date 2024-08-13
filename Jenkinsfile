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
    }

    post {
        always {
            // Archive build artifacts
            archiveArtifacts artifacts: 'build/**/*', allowEmptyArchive: true
        }
        success {
            echo 'Build and Tests Passed!'
        }
        failure {
            echo 'Build or Tests Failed!'
        }
    }
}