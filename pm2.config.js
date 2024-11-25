module.exports = {
  apps: [
    {
      name: "scoreboard-api",
      script: "npm",
      args: "start",
      time: true,
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
