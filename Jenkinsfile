pipeline {
    agent any

    tools {
        nodejs "NodeJS 14"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'master', url: 'https://github.com/regmimilan/devops-final-project.git'
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
        stage('Test') {
            steps {
                sh 'npm test'
            }
        }
    }

    post {
        always {
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


