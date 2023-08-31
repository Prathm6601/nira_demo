pipeline {
    agent any
    
    environment {
        NODE_ENV = 'production'
    }
    
    stages {
        stage('Checkout') {
            steps {
                // Clone the GitLab repository
                git branch: 'main', credentialsId: 'your-gitlab-credentials', url: 'https://gitlab.com/your-username/your-repo.git'
            }
        }
        
        stage('Install Dependencies') {
            steps {
                sh 'npm install'

            }
        }
        
        stage('Build') {
            steps {
                sh ‘npx nx build org-setup’ 
                sh ‘sudo npx nx deploy org-setup’
                sh  ‘sudo npx nx run org-setup:serve:production’
            }
        }

    post {
        always {
            cleanWs() // Clean workspace to remove any residual files
        }
    }
}

