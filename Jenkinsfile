pipeline {
    agent any
    environment {
        NODE_ENV = 'production'
    }
    
    stages {
        stage('Checkout') {
            steps {
                // Clone the GitLab repository
                git branch: 'main', credentialsId: 'git-cred', url: 'https://github.com/Prathm6601/nira_demo.git'
            }
        }
        
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
                sh 'npm install -g nx'

            }
        }
        
        stage('Build') {
            steps {
                sh 'npx nx build org-setup' 
                sh 'npx nx deploy org-setup'
                sh 'npx nx run org-setup:serve:production'
            }
        }
    }    
    post {
        always {
            cleanWs() // Clean workspace to remove any residual files
        }
    }
}

