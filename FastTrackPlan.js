const mongoose = require('mongoose');

const fastTrackPlanSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  selectedNiche: {
    id: String,
    name: String,
    demand: String,
    competition: String,
    profitPotential: String
  },
  selectedOffers: [{
    id: String,
    name: String,
    description: String,
    commission: String,
    epc: String,
    cookieDuration: String,
    logo: String
  }],
  selectedContentTypes: [{
    id: String,
    name: String,
    description: String
  }],
  contentFrequency: {
    type: String,
    enum: ['1 piece per week', '2-3 pieces per week', '4-5 pieces per week', '6+ pieces per week'],
    default: '2-3 pieces per week'
  },
  actionPlan: {
    day1: {
      title: String,
      description: String,
      completed: {
        type: Boolean,
        default: false
      }
    },
    day2_3: {
      title: String,
      description: String,
      completed: {
        type: Boolean,
        default: false
      }
    },
    day4: {
      title: String,
      description: String,
      completed: {
        type: Boolean,
        default: false
      }
    },
    day5_6: {
      title: String,
      description: String,
      completed: {
        type: Boolean,
        default: false
      }
    },
    day7: {
      title: String,
      description: String,
      completed: {
        type: Boolean,
        default: false
      }
    }
  },
  preferences: {
    emailReminders: {
      type: Boolean,
      default: true
    },
    contentTemplates: {
      type: Boolean,
      default: true
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  progress: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  status: {
    type: String,
    enum: ['active', 'completed', 'paused'],
    default: 'active'
  }
});

module.exports = mongoose.model('FastTrackPlan', fastTrackPlanSchema);
