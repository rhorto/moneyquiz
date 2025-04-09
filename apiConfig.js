// API Configuration
const apiConfig = {
    baseUrl: 'https://affiliate-dashboard-api.onrender.com/api',
    endpoints: {
        dashboard: {
            free: '/dashboard/free',
            basic: '/dashboard/basic',
            medium: '/dashboard/medium',
            expert: '/dashboard/expert'
        },
        affiliates: {
            free: '/affiliates/free',
            basic: '/affiliates/basic',
            all: '/affiliates/all'
        },
        niches: {
            basic: '/niches/basic',
            analysis: '/niches/analysis'
        },
        content: {
            templates: '/content/templates',
            calendar: '/content/calendar'
        },
        seo: {
            keywords: '/seo/keywords',
            analysis: '/seo/analysis'
        },
        analytics: {
            performance: '/analytics/performance',
            traffic: '/analytics/traffic',
            conversions: '/analytics/conversions'
        }
    },
    mockUser: {
        id: 'user123',
        name: 'John Doe',
        email: 'john.doe@example.com',
        tier: 'free'
    }
};
