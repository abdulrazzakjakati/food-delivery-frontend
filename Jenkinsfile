pipeline {
    agent any  // ✅ Docker socket mounted

    environment {
        DOCKERHUB_USERNAME    = 'abdulrazzakjakati'
        APP_NAME              = 'food-delivery-frontend'
        GITOPS_REPO_URL       = 'git@github.com:abdulrazzakjakati/deployment.git'
        GITOPS_BRANCH         = 'master'
        MANIFEST_PATH         = "helm/restaurant-microservices-project/food-delivery-frontend/values.yaml"

        DOCKERHUB_CREDENTIALS = credentials('DOCKER_HUB_CREDENTIAL')
        VERSION               = "${env.BUILD_ID}"
        DOCKER_IMAGE          = "${DOCKERHUB_USERNAME}/${APP_NAME}:${VERSION}"
    } 

    stages { 

        stage('Docker Build & Push') {
            steps {
                sh '''
            echo "Workspace contents:"
            ls -la

            echo "Dockerfile exists:"
            test -f Dockerfile && echo "✓ Found" || echo "✗ Missing!"

            docker build -t abdulrazzakjakati/food-delivery-restaurant-service:${BUILD_NUMBER} .
            docker push abdulrazzakjakati/food-delivery-restaurant-service:${BUILD_NUMBER}
        '''
            }
        }

        stage('Update GitOps Manifests') {
            steps {
                checkout scmGit(
                        branches: [[name: "*/${GITOPS_BRANCH}"]],
                        userRemoteConfigs: [[credentialsId: 'git-ssh', url: "${GITOPS_REPO_URL}"]]
                )
                script {
                    sh """
                        # ✅ Best Practice: Target the 'tag' specifically
                        sed -i "s|tag:.*|tag: \\"${VERSION}\\"|" ${MANIFEST_PATH}
                        
                        git config user.name "Jenkins"
                        git config user.email "jenkins@local"
                        git add ${MANIFEST_PATH}
                        git commit -m "Update ${APP_NAME} to v${VERSION}"
                    """
                    sshagent(['git-ssh']) {
                        sh "git push origin HEAD:${GITOPS_BRANCH}"
                    }
                }
            }
        }

        stage('Cleanup') {
            steps {
                deleteDir()
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}
