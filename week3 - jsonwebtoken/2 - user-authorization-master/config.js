// Get the config either from environment variables or pick the default
const config = {
  PORT: process.env.PORT || "3000",
  CLIENT_ID: process.env.CLIENT_ID || "07b2d654567876556",
  CLIENT_SECRET: process.env.CLIENT_SECRET || "8765456789876545678"  
}

module.exports = config;
