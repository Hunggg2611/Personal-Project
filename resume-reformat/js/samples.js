const SAMPLE_RESUMES = [
    {
        id: "software-engineer",
        title: "Software Engineer",
        icon: "💻",
        messy: `ALEX   CHEN
alex.chen92@gmail.com | (408) 555-0147 | linkedin.com/in/alexchen92 | github.com/achen92

ABOUT ME:
full stack dev with 6+ yrs building web apps. Currently at TechFlow working on their main SaaS platform (React/Node). Previously was at a startup called DataPulse where I basically built their entire frontend from scratch. I like clean code and shipping fast.

TECHNICAL SKILLS
-javascript, typescript, react, next.js, node.js
-Python (Django, Flask)
-postgresql, mongodb, redis
-AWS (EC2, S3, Lambda, RDS)
- Docker & Kubernetes
-CI/CD (GitHub Actions, Jenkins)
- REST APIs, GraphQL

WORK EXPERIENCE

TechFlow Inc.  -  Senior Software Engineer
jan 2021 - present
* Led redesign of the main dashboard - reduced load time by 62%
* Built real-time notification system using WebSockets serving 50K+ concurrent users
*mentored 3 junior devs
* Implemented automated testing pipeline, coverage went from 34% to 89%
*architected microservices migration from monolithic Rails app

DataPulse (Startup) -- Frontend Engineer
2018 - 2020
-Built the entire customer-facing dashboard from scratch using React
-Integrated 15+ third-party APIs (Stripe, Twilio, SendGrid etc.)
- Reduced bundle size by 45% through code splitting and lazy loading
-worked directly with CEO on product roadmap

CodeBridge Solutions | Junior Developer | 2016-2018
    * Developed internal tools using PHP/Laravel
    * Maintained legacy jQuery codebase and gradually migrated to React
    *fixed 200+ bugs across 3 production apps

EDUCATION
B.S. Computer Science, San Jose State University, 2016
  GPA: 3.4

CERTIFICATIONS
-AWS Solutions Architect Associate (2022)
-Meta Front-End Developer Professional Certificate`,

        clean: {
            name: "Alex Chen",
            role: "Senior Software Engineer",
            summary: "Full-stack engineer with 6+ years of experience building scalable web applications. Proven track record leading platform redesigns, architecting microservices migrations, and mentoring development teams. Expertise in React, Node.js, and AWS cloud infrastructure.",
            skills: ["JavaScript", "TypeScript", "React", "Next.js", "Node.js", "Python", "PostgreSQL", "MongoDB", "Redis", "AWS", "Docker", "Kubernetes", "GraphQL", "CI/CD"],
            experience: [
                {
                    company: "TechFlow Inc.",
                    title: "Senior Software Engineer",
                    dates: "Jan 2021 – Present",
                    bullets: [
                        "Led redesign of the main dashboard, reducing page load time by 62%",
                        "Built real-time notification system using WebSockets, serving 50K+ concurrent users",
                        "Architected microservices migration from monolithic Rails application",
                        "Implemented automated testing pipeline, increasing code coverage from 34% to 89%",
                        "Mentored 3 junior developers through code reviews and pair programming"
                    ]
                },
                {
                    company: "DataPulse",
                    title: "Frontend Engineer",
                    dates: "2018 – 2020",
                    bullets: [
                        "Built customer-facing analytics dashboard from scratch using React",
                        "Integrated 15+ third-party APIs including Stripe, Twilio, and SendGrid",
                        "Reduced JavaScript bundle size by 45% through code splitting and lazy loading",
                        "Collaborated directly with CEO on product roadmap and feature prioritization"
                    ]
                },
                {
                    company: "CodeBridge Solutions",
                    title: "Junior Developer",
                    dates: "2016 – 2018",
                    bullets: [
                        "Developed internal tools using PHP/Laravel framework",
                        "Migrated legacy jQuery codebase to React, improving maintainability",
                        "Resolved 200+ bugs across 3 production applications"
                    ]
                }
            ],
            education: [{ school: "San Jose State University", degree: "B.S. Computer Science", year: "2016" }],
            certifications: ["AWS Solutions Architect Associate", "Meta Front-End Developer Professional Certificate"]
        }
    },
    {
        id: "registered-nurse",
        title: "Registered Nurse",
        icon: "🏥",
        messy: `Maria Santos, RN, BSN
msantos_nurse@yahoo.com
Cell: 713-555-0293

OBJECTIVE: Seeking a challenging nursing position where I can utilize my clinical skills and compassionate patient care approach

LICENSE & CERTS:
Texas RN License #847291 (Active, exp 2026)
BLS - American Heart Association (current)
ACLS certified
PALS certified
NIH Stroke Scale certified
Wound Care Certified (WCC)

EXPERIENCE:

Memorial Hermann Hospital, Houston TX
Staff Nurse - Med/Surg Unit   06/2019 - present
>> Manage care for 5-7 patients per shift on 36-bed medical-surgical unit
>>administer medications, IV therapy, wound care
>> Collaborate w/ physicians, PTs, social workers on patient care plans
>>trained 12 new grad nurses as unit preceptor
>> Achieved 98% patient satisfaction scores (top 5% in hospital)
>> Implemented bedside shift report process that reduced med errors by 23%
>> Charge nurse responsibilities 2-3 shifts/week

St. Luke's Medical Center
  Nurse Extern/New Grad RN
  01/2018-05/2019
- Assisted RNs with patient assessments and ADLs
- Documented vitals, I&O, patient education in EPIC EMR
- floated between ER, ICU, and med-surg as needed

EDUCATION
BSN - University of Houston, 2018
  Dean's List 4 semesters

SKILLS: Epic EMR, Cerner, medication administration, IV insertion, foley catheter, wound vac, telemetry monitoring, patient education, Spanish (fluent)`,

        clean: {
            name: "Maria Santos, RN, BSN",
            role: "Registered Nurse — Medical-Surgical",
            summary: "Dedicated Registered Nurse with 6+ years of med-surg experience at a Level I trauma center. Unit preceptor with proven leadership as charge nurse. Bilingual (English/Spanish) with consistently top-tier patient satisfaction scores.",
            skills: ["Patient Assessment", "Medication Administration", "IV Therapy", "Wound Care", "Telemetry Monitoring", "Epic EMR", "Cerner", "Patient Education", "Charge Nurse", "Precepting", "Spanish (Fluent)"],
            experience: [
                {
                    company: "Memorial Hermann Hospital",
                    title: "Staff Nurse — Med/Surg Unit",
                    dates: "Jun 2019 – Present",
                    bullets: [
                        "Manage care for 5–7 patients per shift on a 36-bed medical-surgical unit",
                        "Serve as charge nurse 2–3 shifts per week, overseeing unit operations and staffing",
                        "Precepted 12 new graduate nurses through orientation and clinical competency training",
                        "Achieved 98% patient satisfaction scores, ranking in the top 5% hospital-wide",
                        "Implemented bedside shift report process, reducing medication errors by 23%",
                        "Collaborate with interdisciplinary teams including physicians, PTs, and social workers"
                    ]
                },
                {
                    company: "St. Luke's Medical Center",
                    title: "Nurse Extern / New Grad RN",
                    dates: "Jan 2018 – May 2019",
                    bullets: [
                        "Assisted registered nurses with patient assessments and activities of daily living",
                        "Documented vitals, intake/output, and patient education in Epic EMR",
                        "Floated between ER, ICU, and med-surg units based on staffing needs"
                    ]
                }
            ],
            education: [{ school: "University of Houston", degree: "Bachelor of Science in Nursing (BSN)", year: "2018" }],
            certifications: ["TX RN License #847291 (Active)", "BLS (AHA)", "ACLS", "PALS", "NIH Stroke Scale", "Wound Care Certified (WCC)"]
        }
    },
    {
        id: "sales-manager",
        title: "Sales Manager",
        icon: "📊",
        messy: `JASON BROOKS
jbrooks@outlook.com /// 312.555.0184 /// Chicago, IL

PROFILE
Results driven sales leader with 8 years of B2B sales experience. Consistently exceeded quota. Built and managed teams of up to 12 reps. $4.2M in ARR generated last fiscal year.

PROFESSIONAL EXPERIENCE

Velocitrade, Inc | Regional Sales Manager | March 2020 - current
* Manage team of 12 AEs across Midwest region
* Grew regional revenue from 1.8M to 4.2M ARR (+133%) in 3 years
* Personally closed 3 enterprise deals worth $500K+ each
* Implemented Salesforce dashboards that improved pipeline visibility by 40%
* Reduced sales cycle by 18 days (avg) through process optimization
* Hired and onboarded 8 new reps, 6 hit quota within first quarter
* Presidents Club 2021, 2022, 2023

DataSync Solutions -- Account Executive -- 2017-2020
-Exceeded annual quota by avg 124% over 3 years
-Managed portfolio of 45+ mid-market accounts ($50K-$250K ACV)
-Generated $1.2M in new business FY2019 (top 3 company wide)
-built outbound cadence that doubled response rates

TeleCom Partners. SDR -> Senior SDR. 2015-2017.
*Made 80+ cold calls daily
*Set 15-20 qualified meetings per month
*promoted to senior SDR after 8 months (fastest in company history)
*trained 5 new SDRs on prospecting methodology

EDUCATION
BA Business Administration
University of Illinois at Chicago - 2015

TOOLS: Salesforce, HubSpot, Outreach.io, Gong, LinkedIn Sales Navigator, ZoomInfo, Tableau`,

        clean: {
            name: "Jason Brooks",
            role: "Regional Sales Manager",
            summary: "Results-driven B2B sales leader with 8 years of experience scaling teams and revenue. Grew regional ARR from $1.8M to $4.2M (+133%) in 3 years. Three-time Presidents Club winner with a track record of hiring, coaching, and developing high-performing sales teams.",
            skills: ["Team Leadership", "B2B Sales", "Enterprise Deals", "Pipeline Management", "Salesforce", "HubSpot", "Outreach.io", "Gong", "LinkedIn Sales Navigator", "Tableau", "Sales Process Optimization"],
            experience: [
                {
                    company: "Velocitrade, Inc.",
                    title: "Regional Sales Manager",
                    dates: "Mar 2020 – Present",
                    bullets: [
                        "Manage team of 12 Account Executives across the Midwest region",
                        "Grew regional revenue from $1.8M to $4.2M ARR (+133%) over 3 years",
                        "Personally closed 3 enterprise deals valued at $500K+ each",
                        "Implemented Salesforce dashboards improving pipeline visibility by 40%",
                        "Reduced average sales cycle by 18 days through process optimization",
                        "Hired and onboarded 8 new reps; 6 achieved quota within first quarter",
                        "Presidents Club winner: 2021, 2022, 2023"
                    ]
                },
                {
                    company: "DataSync Solutions",
                    title: "Account Executive",
                    dates: "2017 – 2020",
                    bullets: [
                        "Exceeded annual quota by an average of 124% over 3 years",
                        "Managed portfolio of 45+ mid-market accounts ($50K–$250K ACV)",
                        "Generated $1.2M in new business in FY2019, ranking top 3 company-wide",
                        "Developed outbound cadence that doubled prospect response rates"
                    ]
                },
                {
                    company: "TeleCom Partners",
                    title: "SDR → Senior SDR",
                    dates: "2015 – 2017",
                    bullets: [
                        "Conducted 80+ cold calls daily, setting 15–20 qualified meetings per month",
                        "Promoted to Senior SDR after 8 months — fastest promotion in company history",
                        "Trained 5 new SDRs on prospecting methodology and call scripts"
                    ]
                }
            ],
            education: [{ school: "University of Illinois at Chicago", degree: "B.A. Business Administration", year: "2015" }],
            certifications: []
        }
    },
    {
        id: "marketing-coordinator",
        title: "Marketing Coordinator",
        icon: "📱",
        messy: `~~ PRIYA PATEL ~~
priya.patel.mktg@gmail.com | (646) 555-0312
New York, NY | linkedin.com/in/priyapatel-marketing
instagram: @priya.creates (12K followers)

hey! I'm a creative marketing professional with 4 years of experience in digital marketing, social media management, and content creation. passionate about brand storytelling and data-driven campaigns.

WORK EXPERIENCE

Bloom & Co. (DTC Skincare Brand)
Marketing Coordinator, June 2022 - present
    - Manage all social media channels (IG, TikTok, Pinterest, Twitter) -- grew total following from 28K to 95K
    - Create 30+ pieces of content per week (reels, stories, carousels, blog posts)
    - Plan and execute email marketing campaigns (Klaviyo) -- avg 32% open rate, 4.8% CTR
    - Coordinate with influencer partners (managed 40+ partnerships, $200K+ budget)
    - Increased website traffic 156% YoY through SEO and content marketing
    - Assist with product launches -- last launch generated $180K in first 48hrs

Spark Digital Agency
Marketing Assistant -> Junior Strategist, 2020-2022
  * Supported 8-10 client accounts simultaneously
  * Created social media calendars and scheduled posts (Hootsuite, Later)
  * Wrote blog posts, newsletters, and ad copy
  * A/B tested Facebook & Instagram ads -- improved ROAS by 2.3x on key accounts
  * Pulled weekly analytics reports (Google Analytics, FB Business Manager)

Freelance Content Creator, 2019-2020
  -- Built personal brand on Instagram (12K organic followers)
  -- Created content for 6 small businesses
  -- Photography, Canva design, caption writing

EDUCATION
B.A. Communications, NYU, 2020 (magna cum laude)

SKILLS:
adobe creative suite (photoshop, illustrator, premiere), canva, figma, klaviyo, mailchimp, google analytics, meta business suite, hootsuite, later, SEO (semrush, ahrefs), basic HTML/CSS, copywriting, photography`,

        clean: {
            name: "Priya Patel",
            role: "Marketing Coordinator",
            summary: "Creative digital marketing professional with 4 years of experience driving brand growth through social media, content strategy, and email marketing. Grew a DTC brand's social following from 28K to 95K and increased website traffic 156% YoY. Strong blend of creative execution and data-driven optimization.",
            skills: ["Social Media Management", "Content Creation", "Email Marketing (Klaviyo)", "SEO (SEMrush, Ahrefs)", "Google Analytics", "Meta Business Suite", "Adobe Creative Suite", "Figma", "Canva", "Influencer Marketing", "Copywriting", "A/B Testing"],
            experience: [
                {
                    company: "Bloom & Co.",
                    title: "Marketing Coordinator",
                    dates: "Jun 2022 – Present",
                    bullets: [
                        "Manage all social media channels (Instagram, TikTok, Pinterest, Twitter), growing total following from 28K to 95K",
                        "Produce 30+ content pieces weekly including reels, stories, carousels, and blog posts",
                        "Execute email marketing campaigns via Klaviyo, achieving 32% open rate and 4.8% CTR",
                        "Coordinate 40+ influencer partnerships with a $200K+ budget",
                        "Increased website traffic 156% YoY through SEO and content marketing strategy",
                        "Supported product launches generating $180K in revenue within first 48 hours"
                    ]
                },
                {
                    company: "Spark Digital Agency",
                    title: "Marketing Assistant → Junior Strategist",
                    dates: "2020 – 2022",
                    bullets: [
                        "Supported 8–10 client accounts simultaneously across diverse industries",
                        "Created social media calendars and managed scheduling via Hootsuite and Later",
                        "A/B tested Facebook and Instagram ad campaigns, improving ROAS by 2.3x",
                        "Produced weekly analytics reports using Google Analytics and Meta Business Manager"
                    ]
                },
                {
                    company: "Freelance",
                    title: "Content Creator",
                    dates: "2019 – 2020",
                    bullets: [
                        "Built personal Instagram brand to 12K organic followers",
                        "Created photo and video content for 6 small business clients"
                    ]
                }
            ],
            education: [{ school: "New York University", degree: "B.A. Communications (Magna Cum Laude)", year: "2020" }],
            certifications: []
        }
    },
    {
        id: "accountant",
        title: "Accountant / CPA",
        icon: "📋",
        messy: `DAVID WRIGHT, CPA
dwright.cpa@gmail.com
Phone: (214)555-0198
Dallas, TX 75201

CERTIFICATIONS:
CPA - Texas State Board of Public Accountancy (Active)
QuickBooks ProAdvisor Certified
Enrolled Agent (EA) - IRS

PROFESSIONAL EXPERIENCE

Whitfield & Associates, CPAs
Senior Accountant					Aug 2020 - Present
- Manage full-cycle accounting for 35+ small business clients (revenue $500K-$10M)
- Prepare and review federal and state tax returns (1040, 1120, 1120S, 1065, 990)
- Supervise team of 3 staff accountants during tax season
- Identified $2.1M in tax savings for clients through strategic planning in FY2023
- Conduct monthly/quarterly financial reviews and present findings to business owners
- Implement cloud accounting solutions (QBO, Xero) for 20+ clients
- Internal audit procedures for SOX compliance engagements

BDO USA, LLP
Staff Accountant / Audit Associate		2017 - 2020
* Performed financial statement audits for clients with revenues $5M-$200M
* Tested internal controls, substantive procedures, analytical reviews
* Prepared workpapers and documented audit findings
* Industries: manufacturing, real estate, non-profit, healthcare
* Utilized CaseWare, CCH, ProSystem fx

H&R Block (Seasonal)
Tax Preparer 					Jan-Apr 2016, Jan-Apr 2017
- Prepared 150+ individual tax returns per season
- Achieved 99.5% accuracy rate
- Top 10% in customer satisfaction ratings

EDUCATION
M.S. Accounting - University of Texas at Dallas, 2017
B.B.A. Finance - Texas State University, 2015
  Summa Cum Laude, Beta Alpha Psi Honor Society

SOFTWARE: QuickBooks (Desktop & Online), Xero, Sage, Excel (advanced - VLOOKUP, pivot tables, macros), CaseWare, CCH Axcess, ProSystem fx, Lacerte, UltraTax, SAP`,

        clean: {
            name: "David Wright, CPA",
            role: "Senior Accountant",
            summary: "Licensed CPA and Enrolled Agent with 7+ years of public accounting experience spanning tax, audit, and advisory services. Manages full-cycle accounting for 35+ small business clients and identified $2.1M in tax savings in FY2023. Strong expertise in cloud accounting implementations and multi-entity tax compliance.",
            skills: ["Tax Preparation (1040/1120/1065/990)", "Financial Statement Audits", "QuickBooks Online & Desktop", "Xero", "Excel (Advanced)", "CaseWare", "CCH Axcess", "SOX Compliance", "Client Advisory", "Cloud Accounting", "SAP"],
            experience: [
                {
                    company: "Whitfield & Associates, CPAs",
                    title: "Senior Accountant",
                    dates: "Aug 2020 – Present",
                    bullets: [
                        "Manage full-cycle accounting for 35+ small business clients ($500K–$10M revenue)",
                        "Prepare and review federal and state tax returns (1040, 1120, 1120S, 1065, 990)",
                        "Supervise team of 3 staff accountants during tax season",
                        "Identified $2.1M in aggregate tax savings for clients through strategic planning in FY2023",
                        "Implemented cloud accounting solutions (QBO, Xero) for 20+ client transitions",
                        "Conduct monthly and quarterly financial reviews with business owner presentations"
                    ]
                },
                {
                    company: "BDO USA, LLP",
                    title: "Staff Accountant / Audit Associate",
                    dates: "2017 – 2020",
                    bullets: [
                        "Performed financial statement audits for clients with revenues of $5M–$200M",
                        "Tested internal controls and executed substantive audit procedures",
                        "Served clients across manufacturing, real estate, non-profit, and healthcare industries"
                    ]
                },
                {
                    company: "H&R Block",
                    title: "Tax Preparer (Seasonal)",
                    dates: "2016 – 2017",
                    bullets: [
                        "Prepared 150+ individual tax returns per season with a 99.5% accuracy rate",
                        "Ranked in top 10% for customer satisfaction ratings"
                    ]
                }
            ],
            education: [
                { school: "University of Texas at Dallas", degree: "M.S. Accounting", year: "2017" },
                { school: "Texas State University", degree: "B.B.A. Finance (Summa Cum Laude)", year: "2015" }
            ],
            certifications: ["CPA — Texas (Active)", "Enrolled Agent (IRS)", "QuickBooks ProAdvisor"]
        }
    },
    {
        id: "project-manager",
        title: "Project Manager",
        icon: "📐",
        messy: `RACHEL NGUYEN
rnguyen.pm@gmail.com
Seattle, WA | 206-555-0174

PMP Certified | CSM | ITIL v4 Foundation

SUMMARY:
Experienced project manager with 7 yrs managing cross-functional technology projects. Managed portfolios up to $8M. Agile/Scrum & Waterfall. Led teams of 5-25 across US, India, and Philippines. Strong stakeholder management and risk mitigation skills.

EXPERIENCE

Amazon Web Services (AWS)
Technical Program Manager, L6		Feb 2022 - Present
>> Own delivery of 3 concurrent service launches (each $1.5-3M budget)
>> Coordinate across 25+ engineers, 4 product managers, 2 UX designers
>> Reduced launch cycle time by 30% by implementing streamlined approval workflows
>> Manage dependencies across 8 internal service teams
>> Present bi-weekly status to VP-level stakeholders
>> Drove adoption of Jira Advanced Roadmaps across the org (150+ users)

Expedia Group
Senior Project Manager			2019-2022
- Led migration of legacy booking platform to microservices (18-month, $4.2M program)
- Managed offshore team of 15 developers in Bangalore
- Implemented Agile transformation for 3 Waterfall teams
- Reduced project delivery defects by 42% through improved QA processes
- Stakeholder management across product, engineering, marketing, legal, and finance

Deloitte Consulting
Business Analyst -> Project Coordinator	2017-2019
* Supported 4 large-scale ERP implementations (SAP, Oracle)
* Created project plans, RAID logs, and status reports
* Facilitated requirements gathering workshops with client stakeholders
* Promoted from BA to Project Coordinator after 10 months

EDUCATION
MBA, University of Washington (Foster School), 2022
BS Information Systems, University of Washington, 2017

TOOLS: Jira, Confluence, Asana, MS Project, Smartsheet, Miro, Lucidchart, Tableau, SQL (basic), Slack, Teams`,

        clean: {
            name: "Rachel Nguyen",
            role: "Technical Program Manager",
            summary: "PMP-certified program manager with 7 years of experience leading cross-functional technology projects up to $8M in budget. Expertise in Agile transformation, stakeholder management, and global team coordination across US, India, and Philippines. Currently managing concurrent AWS service launches.",
            skills: ["Program Management", "Agile/Scrum", "Waterfall", "Jira", "Confluence", "MS Project", "Stakeholder Management", "Risk Mitigation", "Vendor Management", "Smartsheet", "Miro", "SQL"],
            experience: [
                {
                    company: "Amazon Web Services (AWS)",
                    title: "Technical Program Manager (L6)",
                    dates: "Feb 2022 – Present",
                    bullets: [
                        "Own delivery of 3 concurrent service launches with $1.5–3M budgets each",
                        "Coordinate cross-functionally across 25+ engineers, 4 product managers, and 2 UX designers",
                        "Reduced launch cycle time by 30% through streamlined approval workflows",
                        "Manage dependencies across 8 internal service teams",
                        "Present bi-weekly status updates to VP-level stakeholders",
                        "Drove adoption of Jira Advanced Roadmaps across the organization (150+ users)"
                    ]
                },
                {
                    company: "Expedia Group",
                    title: "Senior Project Manager",
                    dates: "2019 – 2022",
                    bullets: [
                        "Led migration of legacy booking platform to microservices (18-month, $4.2M program)",
                        "Managed offshore development team of 15 engineers in Bangalore",
                        "Implemented Agile transformation for 3 formerly Waterfall teams",
                        "Reduced project delivery defects by 42% through improved QA processes"
                    ]
                },
                {
                    company: "Deloitte Consulting",
                    title: "Business Analyst → Project Coordinator",
                    dates: "2017 – 2019",
                    bullets: [
                        "Supported 4 large-scale ERP implementations (SAP, Oracle)",
                        "Facilitated requirements gathering workshops with client stakeholders",
                        "Promoted from Business Analyst to Project Coordinator after 10 months"
                    ]
                }
            ],
            education: [
                { school: "University of Washington (Foster School)", degree: "MBA", year: "2022" },
                { school: "University of Washington", degree: "B.S. Information Systems", year: "2017" }
            ],
            certifications: ["PMP (Project Management Professional)", "CSM (Certified ScrumMaster)", "ITIL v4 Foundation"]
        }
    },
    {
        id: "customer-service",
        title: "Customer Service Rep",
        icon: "🎧",
        messy: `Tanya Williams
tanya.w2023@gmail.com
Atlanta GA 30301
(770) 555 0261

Objective: Looking for a customer service role where I can use my communication skills and experience to help customers and grow with a company.

Work History:

T-Mobile | Customer Care Specialist | March 2022 - Present
-Handle 60-80 inbound calls per day regarding billing, technical support, and account changes
-Maintain 94% customer satisfaction (CSAT) rating -- team avg is 87%
-Process account modifications, plan changes, and equipment orders in OPUS and Quickview
-Selected for "T-Mobile Expert" tier after 6 months (top 15% of agents)
-De-escalation specialist: handle transferred calls from Tier 1 agents
-trained 4 new hires on call handling procedures and systems

Amazon (Seasonal then converted)
Customer Service Associate
Nov 2020 - Feb 2022
* Resolved customer inquiries via chat and email (avg 45 contacts/day)
* Handled returns, refunds, order tracking, and A-to-Z claims
* Maintained 4.7/5.0 customer rating
* Converted from seasonal to permanent after 3 months
* Used Amazon Connect, Salesforce Service Cloud

Target - Guest Service Team Member - 2019-2020
  . Processed returns and exchanges at the service desk
  . Answered phones and directed calls
  . Assisted with drive-up and order pickup orders
  . Received "Guest Service Star" recognition twice

EDUCATION:
Some college coursework - Georgia State University (2019-2020)
HS Diploma - Westlake High School, 2019

Skills: zendesk, salesforce service cloud, five9, opus, quickview, microsoft office, typing 75 WPM, bilingual english/spanish, conflict resolution, multitasking`,

        clean: {
            name: "Tanya Williams",
            role: "Customer Care Specialist",
            summary: "High-performing customer service professional with 4+ years of experience in high-volume call center and omnichannel support environments. Consistently exceeds CSAT targets with a 94% satisfaction rating (vs. 87% team average). Bilingual English/Spanish with strong de-escalation and training skills.",
            skills: ["Inbound Call Handling", "De-escalation", "Zendesk", "Salesforce Service Cloud", "Five9", "CRM Systems", "Billing Support", "Technical Troubleshooting", "75 WPM Typing", "Bilingual (English/Spanish)"],
            experience: [
                {
                    company: "T-Mobile",
                    title: "Customer Care Specialist",
                    dates: "Mar 2022 – Present",
                    bullets: [
                        "Handle 60–80 inbound calls daily covering billing, technical support, and account changes",
                        "Maintain 94% CSAT rating, exceeding team average of 87%",
                        "Selected for 'T-Mobile Expert' tier within 6 months (top 15% of agents)",
                        "Serve as de-escalation specialist for transferred Tier 1 calls",
                        "Trained 4 new hires on call handling procedures and internal systems"
                    ]
                },
                {
                    company: "Amazon",
                    title: "Customer Service Associate",
                    dates: "Nov 2020 – Feb 2022",
                    bullets: [
                        "Resolved customer inquiries via chat and email, averaging 45 contacts per day",
                        "Handled returns, refunds, order tracking, and A-to-Z claims",
                        "Maintained 4.7/5.0 customer rating; converted from seasonal to permanent after 3 months"
                    ]
                },
                {
                    company: "Target",
                    title: "Guest Service Team Member",
                    dates: "2019 – 2020",
                    bullets: [
                        "Processed returns and exchanges at the guest service desk",
                        "Received 'Guest Service Star' recognition twice for exceptional performance"
                    ]
                }
            ],
            education: [
                { school: "Georgia State University", degree: "Coursework in Business Administration", year: "2019–2020" },
                { school: "Westlake High School", degree: "High School Diploma", year: "2019" }
            ],
            certifications: []
        }
    },
    {
        id: "vp-operations",
        title: "VP of Operations",
        icon: "🏢",
        messy: `CHRISTOPHER J. MARTINEZ
chris.martinez@executivemail.com | (858) 555-0142 | San Diego, CA
LinkedIn: linkedin.com/in/cjmartinez-ops

EXECUTIVE PROFILE

Seasoned operations executive with 15+ years of progressive leadership in supply chain, logistics, and manufacturing operations. Proven ability to drive P&L performance, lead organizational transformations, and build high-performing teams. Track record of delivering $20M+ in annual cost savings through process optimization and strategic vendor management. Board advisor to two logistics startups.

PROFESSIONAL EXPERIENCE

NexGen Logistics Corp.
Vice President, Operations					2019 - Present
Scope: 4 distribution centers, 380+ employees, $120M annual budget

• Restructured distribution network, reducing average delivery time from 4.2 days to 2.1 days
• Delivered $22M in cumulative cost savings over 4 years through lean manufacturing and vendor renegotiation
• Led implementation of SAP S/4HANA across all facilities ($8M project, on time and under budget)
• Reduced employee turnover from 34% to 18% through revised compensation structure and career pathing
• Established KPI dashboard framework adopted by C-suite for monthly business reviews
• Direct reports: 6 Directors, 22 Managers

Pacific Manufacturing Group
Director of Operations					2015 - 2019
• Managed 3 production facilities (200+ employees)
• Increased production throughput by 28% while reducing defect rate from 3.2% to 0.8%
• Implemented Six Sigma program -- trained and certified 15 Green Belts
• Negotiated $4.5M in vendor contracts saving 12% annually
• Led ISO 9001:2015 certification for all facilities

FedEx Supply Chain (formerly GENCO)
Operations Manager					2010 - 2015
• Managed daily operations of 250K sq ft distribution center
• Supervised team of 85 hourly associates and 6 supervisors
• Achieved 99.7% order accuracy and 99.2% on-time shipment rate
• Reduced overtime costs by 35% through demand forecasting improvements

EDUCATION
MBA, Supply Chain Management -- University of San Diego, 2014
BS Industrial Engineering -- Cal Poly San Luis Obispo, 2009

CERTIFICATIONS & AFFILIATIONS
- Lean Six Sigma Black Belt
- APICS CSCP (Certified Supply Chain Professional)
- Board Advisor, ShipFast Technologies (Series A logistics startup)
- Board Advisor, GreenRoute AI (seed-stage sustainability logistics)
- Member, Council of Supply Chain Management Professionals (CSCMP)`,

        clean: {
            name: "Christopher J. Martinez",
            role: "Vice President, Operations",
            summary: "Seasoned operations executive with 15+ years of progressive leadership in supply chain, logistics, and manufacturing. Oversees 4 distribution centers, 380+ employees, and a $120M annual budget. Delivered $22M in cumulative cost savings and cut average delivery time by 50%. Board advisor to two logistics startups.",
            skills: ["P&L Management", "Supply Chain Strategy", "Lean Six Sigma (Black Belt)", "SAP S/4HANA", "Vendor Negotiation", "Team Development", "ISO 9001", "KPI Frameworks", "Distribution Network Design", "Change Management", "Demand Forecasting"],
            experience: [
                {
                    company: "NexGen Logistics Corp.",
                    title: "Vice President, Operations",
                    dates: "2019 – Present",
                    bullets: [
                        "Oversee 4 distribution centers, 380+ employees, and $120M annual operating budget",
                        "Restructured distribution network, reducing average delivery time from 4.2 to 2.1 days",
                        "Delivered $22M in cumulative cost savings through lean manufacturing and vendor renegotiation",
                        "Led on-time, under-budget implementation of SAP S/4HANA across all facilities ($8M project)",
                        "Reduced employee turnover from 34% to 18% through compensation redesign and career pathing",
                        "Direct leadership of 6 Directors and 22 Managers"
                    ]
                },
                {
                    company: "Pacific Manufacturing Group",
                    title: "Director of Operations",
                    dates: "2015 – 2019",
                    bullets: [
                        "Managed 3 production facilities with 200+ employees",
                        "Increased production throughput 28% while reducing defect rate from 3.2% to 0.8%",
                        "Implemented Six Sigma program, training and certifying 15 Green Belts",
                        "Led ISO 9001:2015 certification across all facilities"
                    ]
                },
                {
                    company: "FedEx Supply Chain",
                    title: "Operations Manager",
                    dates: "2010 – 2015",
                    bullets: [
                        "Managed daily operations of 250K sq ft distribution center with 85 associates",
                        "Achieved 99.7% order accuracy and 99.2% on-time shipment rate",
                        "Reduced overtime costs by 35% through improved demand forecasting"
                    ]
                }
            ],
            education: [
                { school: "University of San Diego", degree: "MBA, Supply Chain Management", year: "2014" },
                { school: "Cal Poly San Luis Obispo", degree: "B.S. Industrial Engineering", year: "2009" }
            ],
            certifications: ["Lean Six Sigma Black Belt", "APICS CSCP", "Board Advisor — ShipFast Technologies", "Board Advisor — GreenRoute AI"]
        }
    },
    {
        id: "entry-level",
        title: "Recent Graduate",
        icon: "🎓",
        messy: `Jordan Taylor
jordantaylor2024@gmail.com
(502) 555-0183
Louisville, KY

EDUCATION:
University of Louisville
Bachelor of Science in Business Administration
Concentration: Management
Graduated: May 2024
GPA: 3.6/4.0
Dean's List: Fall 2022, Spring 2023, Fall 2023
Relevant Coursework: Organizational Behavior, Operations Management, Business Analytics, Marketing Principles, Financial Accounting, Strategic Management

ACTIVITIES:
- Vice President, Business Student Association (2023-2024)
- Volunteer, Habitat for Humanity Louisville Chapter (50+ hours)
- Intramural Soccer Team Captain

EXPERIENCE:

UPS -- Seasonal Package Handler -- Louisville, KY
May-Aug 2023 (Summer), Nov-Dec 2023
-Sorted and loaded 800+ packages per shift in fast-paced warehouse environment
-Maintained 99% scan accuracy rate
-Worked 4am-9am shifts while maintaining full course load

University of Louisville Career Center
Student Office Assistant, Aug 2022 - May 2024
  -Greeted students and helped them schedule career counseling appointments
  -Managed front desk operations and answered phone inquiries (30+/day)
  -Created social media content promoting career fairs and workshops
  -Organized career fair logistics for 100+ employer booths

Chick-fil-A | Team Member | Louisville KY | 2020-2022
* Provided fast, friendly service in high-volume drive-thru (200+ cars/day)
* Trained 3 new team members
* Promoted to shift lead responsibilities after 1 year
* Employee of the Month x2

SKILLS:
Microsoft Office (Word, Excel, PowerPoint), Google Workspace, basic Tableau, Canva, social media management, customer service, teamwork, time management, leadership`,

        clean: {
            name: "Jordan Taylor",
            role: "Business Administration Graduate",
            summary: "Motivated recent graduate with a B.S. in Business Administration (3.6 GPA) and hands-on experience in operations, customer service, and team leadership. Demonstrated work ethic through full-time coursework with concurrent employment. Proven organizational and communication skills through student leadership and career center operations.",
            skills: ["Microsoft Office Suite", "Google Workspace", "Tableau (Basic)", "Canva", "Social Media Management", "Customer Service", "Team Leadership", "Operations", "Data Entry", "Event Coordination"],
            experience: [
                {
                    company: "University of Louisville Career Center",
                    title: "Student Office Assistant",
                    dates: "Aug 2022 – May 2024",
                    bullets: [
                        "Managed front desk operations and handled 30+ daily phone inquiries",
                        "Created social media content promoting career fairs and workshops",
                        "Coordinated career fair logistics accommodating 100+ employer booths"
                    ]
                },
                {
                    company: "UPS",
                    title: "Seasonal Package Handler",
                    dates: "Summer 2023, Nov–Dec 2023",
                    bullets: [
                        "Sorted and loaded 800+ packages per shift in fast-paced warehouse environment",
                        "Maintained 99% scan accuracy rate across all shifts"
                    ]
                },
                {
                    company: "Chick-fil-A",
                    title: "Team Member → Shift Lead",
                    dates: "2020 – 2022",
                    bullets: [
                        "Provided fast, friendly service in high-volume drive-thru (200+ cars/day)",
                        "Promoted to shift lead responsibilities after 1 year; trained 3 new team members",
                        "Recognized as Employee of the Month twice"
                    ]
                }
            ],
            education: [{ school: "University of Louisville", degree: "B.S. Business Administration, Management (GPA: 3.6, Dean's List)", year: "2024" }],
            certifications: []
        }
    },
    {
        id: "bilingual-international",
        title: "Bilingual / International",
        icon: "🌐",
        messy: `CAROLINA HERRERA LÓPEZ
carolina.herrera.l@gmail.com
+1 (305) 555-0294 | Miami, FL
Languages: Spanish (native), English (fluent), Portuguese (conversational)

RESUMEN PROFESIONAL / PROFESSIONAL SUMMARY
Bilingual HR professional with 5+ years of experience in talent acquisition and HR operations across Latin America and the US. Specialized in cross-border recruitment for companies expanding into LATAM markets. Experience managing full-cycle recruiting in both English and Spanish.

EXPERIENCIA LABORAL / WORK EXPERIENCE

GlobalHire Staffing -- Miami, FL
Senior Recruiter (Bilingual)			Enero/January 2022 - Presente/Present
• Full-cycle recruitment for US companies hiring in Mexico, Colombia, Brazil, and Argentina
• Manage 25-30 open requisitions simultaneously across engineering, finance, and operations
• Reduced time-to-fill from 45 days to 28 days for LATAM positions
• Built candidate pipeline of 2,000+ pre-screened bilingual professionals
• Coordinate with immigration attorneys on H-1B, TN, and L-1 visa processes
• Train hiring managers on cross-cultural interview best practices

Grupo Talento -- Bogotá, Colombia
Coordinadora de Reclutamiento		2019-2021
- Managed recruitment for 3 Colombian offices (Bogotá, Medellín, Cali)
- Filled 150+ positions annually across administrative, sales, and IT roles
- Implemented LinkedIn Recruiter, reducing external agency spend by 40%
- Conducted competency-based interviews in Spanish and English
- Organized 6 campus recruiting events per year at local universities

Randstad (Colombia)
Asistente de RRHH / HR Assistant		2018-2019
* Processed payroll for 200+ temporary workers using NominaPlus
* Managed employee onboarding documentation and compliance
* Supported benefits administration and workers comp claims

EDUCACIÓN / EDUCATION
Licenciatura en Psicología (equiv. B.A. Psychology)
Universidad de los Andes, Bogotá -- 2018
SHRM-CP Certification -- 2023

HERRAMIENTAS / TOOLS: Greenhouse, Lever, LinkedIn Recruiter, BambooHR, Workday, ADP, Microsoft 365, Zoom, Google Meet, WhatsApp Business`,

        clean: {
            name: "Carolina Herrera López",
            role: "Senior Bilingual Recruiter",
            summary: "Bilingual HR professional with 5+ years of experience in talent acquisition across the US and Latin America. Specialized in cross-border recruitment for companies expanding into LATAM markets. Reduced time-to-fill by 38% and built a pipeline of 2,000+ pre-screened bilingual professionals. Trilingual: Spanish (native), English (fluent), Portuguese (conversational).",
            skills: ["Full-Cycle Recruiting", "Cross-Border Recruitment", "Greenhouse", "Lever", "LinkedIn Recruiter", "BambooHR", "Workday", "ADP", "Visa Coordination (H-1B/TN/L-1)", "Competency-Based Interviewing", "Spanish (Native)", "English (Fluent)", "Portuguese (Conversational)"],
            experience: [
                {
                    company: "GlobalHire Staffing",
                    title: "Senior Recruiter (Bilingual)",
                    dates: "Jan 2022 – Present",
                    bullets: [
                        "Manage full-cycle recruitment for US companies hiring across Mexico, Colombia, Brazil, and Argentina",
                        "Handle 25–30 open requisitions simultaneously across engineering, finance, and operations",
                        "Reduced time-to-fill from 45 to 28 days for LATAM positions",
                        "Built candidate pipeline of 2,000+ pre-screened bilingual professionals",
                        "Coordinate with immigration attorneys on H-1B, TN, and L-1 visa processes",
                        "Train hiring managers on cross-cultural interview best practices"
                    ]
                },
                {
                    company: "Grupo Talento — Bogotá, Colombia",
                    title: "Recruitment Coordinator",
                    dates: "2019 – 2021",
                    bullets: [
                        "Managed recruitment for 3 Colombian offices, filling 150+ positions annually",
                        "Implemented LinkedIn Recruiter, reducing external agency spend by 40%",
                        "Organized 6 campus recruiting events per year at local universities"
                    ]
                },
                {
                    company: "Randstad — Colombia",
                    title: "HR Assistant",
                    dates: "2018 – 2019",
                    bullets: [
                        "Processed payroll for 200+ temporary workers",
                        "Managed employee onboarding documentation and compliance"
                    ]
                }
            ],
            education: [{ school: "Universidad de los Andes, Bogotá", degree: "B.A. Psychology (Licenciatura en Psicología)", year: "2018" }],
            certifications: ["SHRM-CP (2023)"]
        }
    }
];
