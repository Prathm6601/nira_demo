pipeline {
    agent any
    
    stages {
        stage('Checkout') {
            steps {
                // Clone the Git repository
                checkout([$class: 'GitSCM',
                          branches: [[name: 'main']],
                          userRemoteConfigs: [[url: 'https://github.com/Prathm6601/nira_demo.git']],
                          credentialsId: 'git-cred'])
            }
        }
        
        stage('Install Dependencies') {
            steps {
                sh 'npm install' // No need for 'sudo' here
                
                // Install the Nx CLI globally
              //  sh 'npm install -g nx'
            }
        }
        
        stage('Build') {
            steps {
                // Use 'npx' to run Nx commands without the need to install packages globally
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
