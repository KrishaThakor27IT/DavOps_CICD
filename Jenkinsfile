// Jenkinsfile
pipeline {
    agent any
    tools { nodejs 'NodeJS-18' }
    environment {
        // --- These are the values you have set ---
        DOCKERHUB_CREDENTIALS = 'dockerhub-credentials'
        DOCKER_IMAGE_NAME     = '23it132/my-node-app'
        DEPLOY_SERVER_IP      = '3.84.137.70'
        DEPLOY_SERVER_USER    = 'ec2-user'
        SSH_CREDENTIALS       = 'ec2-ssh-key'
        GITHUB_REPO_URL       = 'https://github.com/KrishaThakor27IT/DevOps_CICD.git'
    }
    stages {
        stage('Install & Test') { // Renamed for clarity
            steps {
                // REMOVED: The redundant 'git' command was here.
                sh 'npm install'
                sh 'npm test'
            }
        }
        stage('Build & Push Docker Image') {
            steps {
                script {
                    def dockerImage = docker.build("${DOCKER_IMAGE_NAME}:${BUILD_NUMBER}", '.')
                    docker.withRegistry('https://registry.hub.docker.com', DOCKERHUB_CREDENTIALS) {
                        dockerImage.push()
                        dockerImage.push('latest')
                    }
                }
            }
        }
        stage('Deploy to Server') {
            steps {
                sshagent(credentials: [SSH_CREDENTIALS]) {
                    sh """
                        ssh -o StrictHostKeyChecking=no ${DEPLOY_SERVER_USER}@${DEPLOY_SERVER_IP} '
                            docker pull ${DOCKER_IMAGE_NAME}:latest
                            docker stop my-node-app || true
                            docker rm my-node-app || true
                            docker run -d --name my-node-app -p 80:3000 ${DOCKER_IMAGE_NAME}:latest
                        '
                    """
                }
            }
        }
    }
}
