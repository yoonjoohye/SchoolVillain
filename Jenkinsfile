#!groovy

def scmVars

env.BUILD_ENV = "develop"
env.BUILD_ENV_NAME = "build:development"

node('swarm') {

    env.NODEJS_HOME = "${tool 'Node 15.x'}"
// on linux / mac
    env.PATH="${env.NODEJS_HOME}/bin:${env.PATH}"

    stage('Checkout') {
        slackSend (
          channel: "#jenkins",
          color: "#FFFF00",
          message: "프론트 배포 시작한다? => Job *${env.JOB_NAME}*. [${env.BUILD_NUMBER}] - ${env.BUILD_URL}"
        )
    // Get some code from a Git repository
        scmVars = checkout scm
        env.GIT_BRANCH = scmVars.GIT_BRANCH

        if (env.GIT_BRANCH == 'origin/master') {
            env.BUILD_ENV = 'production'
            env.BUILD_ENV_NAME = "build:production"
        }
    }

    stage('Build image') {
        app = docker.withRegistry('https://cda56497-kr1-registry.container.cloud.toast.com', 'toast-docker-registry') {
            docker.build("cda56497-kr1-registry.container.cloud.toast.com/villain-front-${env.BUILD_ENV}", "-f docker/Dockerfile .")
        }
    }

    stage('Push image') {
        docker.withRegistry('https://cda56497-kr1-registry.container.cloud.toast.com', 'toast-docker-registry') {
            app.push("${env.BUILD_NUMBER}")
        }
    }

    node('master') {
        try {
            stage('Checkout') {
                checkout scm
            }
            stage("Deploy to Swarm") {
                docker.withRegistry('https://cda56497-kr1-registry.container.cloud.toast.com', 'toast-docker-registry') {
                    sh """
                        yq w -i docker/swarm/${env.BUILD_ENV}.yaml services.backend.image cda56497-kr1-registry.container.cloud.toast.com/villain-front-${env.BUILD_ENV}:${env.BUILD_NUMBER}
                        docker stack deploy -c docker/swarm/${env.BUILD_ENV}.yaml ${env.BUILD_ENV}-laravel --with-registry-auth
                    """
                }
            }

            slackSend (
              channel: "#jenkins",
              color: "good",
              message: "프론트 배포 성공했다! => Job *${env.JOB_NAME}*. [${env.BUILD_NUMBER}] - ${env.BUILD_URL}"
            )

        } catch (e) {
            slackSend (
              channel: "#jenkins",
              color: "#FF0000",
              message: "젠장... => Job *${env.JOB_NAME}*. [${env.BUILD_NUMBER}] - ${env.BUILD_URL}"
            )
            throw e
        } finally {
            deleteDir() /* clean up our workspace */
        }
    }
}
