pipeline {
    agent any
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
                sh 'sudo npm install'
                sh 'sudo npm install -g nx'

            }
        }
        
        stage('Build') {
            steps {
                sh 'sudo npx nx build org-setup' 
                sh 'sudo npx nx deploy org-setup'
                sh 'sudo npx nx run org-setup:serve:production'
            }
        }
    }    
    post {
        always {
            cleanWs() // Clean workspace to remove any residual files
        }
    }
}

