module.exports = {
  apps: [{
    name: "idp-client",
    script: "npm",
    args: "start",
    env: {
      PORT: 3001,
    }
  }]
}