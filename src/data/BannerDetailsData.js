import bd2 from '../assets/BannerDetails/bd2.png';
import bd3 from '../assets/BannerDetails/bd3.png';
import bd4 from '../assets/BannerDetails/bd4.jpg';

export const bannerDetailsData = [
    {
        id: 1,
        reverse: false,
        title: "Smart Resume Analysis",
        description: "Receive instant, AI-driven feedback to boost your resume's impact and job-match potential.",
        points: [
            "Highlights gaps in essential skills or experience",
            "Recommends tailored improvements based on your target industry",
        ],
        image: bd2,
    },
    {
        id: 2,
        reverse: true,
        title: "Detailed Insights",
        description: "Gain a clear understanding of your resume's performance across essential metrics.",
        points: [
            "Offers a readability score with actionable suggestions",
            "Evaluates the strength and clarity of achievement statements",
            "Benchmarks your resume against industry standards"
        ],
        image: bd3,
    },
    {
        id: 3,
        reverse: false,
        title: "Actionable Resume Recommendations",
        description: "Get targeted suggestions to refine and strengthen every section of your resume.",
        points: [
            "Recommends impactful word choices to enhance clarity and tone",
            "Identifies areas where metrics or results can boost credibility",
            "Suggests layout and formatting improvements for better readability"
        ],
        image: bd4,
    },
];
