from fastapi import APIRouter
from backend.models.startup_model import StartupRequest
from backend.services.startup_service import analyze_startup_service
router = APIRouter()

@router.post("/startup/analyze")
def analyze_startup(data: StartupRequest):

   return analyze_startup_service(data)

@router.post("/competitor/analyze")
def competitor_analysis(data: dict):

    startup = data.get("startup", "").lower()

    try:

        from backend.ai.gemini_config import client

        prompt = f"""
        Analyze competitors for this startup:

        Startup Idea: {startup}

        Give:
        - top competitors
        - market gaps
        - pricing strategy
        - differentiation strategy
        - market opportunities
        """

        response = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=prompt
        )

        return {
            "competitor_analysis": response.text
        }

    except Exception:

        if "fitness" in startup:

            return {
                "competitor_analysis": {
                    "top_competitors": [
                        "Fitbit",
                        "CultFit",
                        "HealthifyMe"
                    ],
                    "market_gap": "AI nutrition personalization",
                    "pricing_strategy": "Freemium subscription",
                    "competition_level": "High"
                }
            }

        elif "education" in startup or "student" in startup:

            return {
                "competitor_analysis": {
                    "top_competitors": [
                        "Byju’s",
                        "Unacademy",
                        "Coursera"
                    ],
                    "market_gap": "AI adaptive mentoring",
                    "pricing_strategy": "Affordable monthly subscription",
                    "competition_level": "Medium to High"
                }
            }

        else:

            return {
                "competitor_analysis": {
                    "top_competitors": [
                        "Industry competitors"
                    ],
                    "market_gap": "Innovation opportunities available",
                    "pricing_strategy": "Flexible pricing",
                    "competition_level": "Medium"
                }
            }


@router.post("/burnrate/predict")
def burnrate_prediction(data: dict):

    revenue = data.get("revenue", 0)
    expenses = data.get("expenses", 0)
    funding = data.get("funding", 0)

    monthly_burn = expenses - revenue

    if monthly_burn <= 0:
        runway = "Profitable"
        risk = "Low"

    else:
        runway = round(funding / monthly_burn, 1)
        risk = "High" if runway < 6 else "Medium"

    try:

        from backend.ai.gemini_config import client

        prompt = f"""
        Analyze startup financial health.

        Revenue: {revenue}
        Expenses: {expenses}
        Funding: {funding}

        Give:
        - financial risk
        - growth advice
        - scaling suggestions
        """

        response = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=prompt
        )

        ai_insights = response.text

    except Exception:

        ai_insights = """
        Reduce operational costs and improve customer acquisition efficiency.
        Focus on sustainable scaling and retention strategies.
        """

    return {
        "burn_rate_analysis": {
            "monthly_burn_rate": monthly_burn,
            "runway_months": runway,
            "financial_risk": risk,
            "ai_insights": ai_insights
        }
    }

@router.get("/events")
def get_events():

    return {
        "events": [
            {
                "title": "Startup Pitch Fest",
                "location": "Bangalore",
                "date": "12 June 2026",
                "type": "Investor Pitch Event"
            },
            {
                "title": "AI Founder Meetup",
                "location": "Chennai",
                "date": "18 June 2026",
                "type": "Networking Event"
            }
        ]
    }


@router.post("/events/create")
def create_event(data: dict):

    return {
        "message": "Event created successfully",
        "event": data
    }

@router.get("/workspace")
def get_workspaces():

    return {
        "workspaces": [
            {
                "name": "Startup Hub Bangalore",
                "location": "Bangalore",
                "price": "₹12000/month",
                "facilities": [
                    "WiFi",
                    "Meeting Rooms",
                    "24/7 Access"
                ]
            },
            {
                "name": "TechSpace Chennai",
                "location": "Chennai",
                "price": "₹9000/month",
                "facilities": [
                    "Parking",
                    "Cafeteria",
                    "High-Speed Internet"
                ]
            }
        ]
    }


@router.post("/workspace/create")
def create_workspace(data: dict):

    return {
        "message": "Workspace listed successfully",
        "workspace": data
    }

@router.post("/marketing/strategy")
def marketing_strategy(data: dict):

    startup = data.get("startup", "").lower()

    try:

        from backend.ai.gemini_config import client

        prompt = f"""
        Generate marketing and growth strategies for this startup:

        Startup Idea: {startup}

        Give:
        - customer acquisition ideas
        - social media strategies
        - revenue growth strategies
        - scaling suggestions
        """

        response = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=prompt
        )

        return {
            "marketing_strategy": response.text
        }

    except Exception:

        if "fitness" in startup:

            return {
                "marketing_strategy": {
                    "customer_acquisition": [
                        "Influencer collaborations",
                        "Fitness referral programs"
                    ],
                    "social_media_strategy": [
                        "Instagram fitness reels",
                        "YouTube transformation content"
                    ],
                    "revenue_growth": [
                        "Premium workout plans",
                        "AI nutrition subscriptions"
                    ]
                }
            }

        elif "education" in startup or "student" in startup:

            return {
                "marketing_strategy": {
                    "customer_acquisition": [
                        "Campus ambassador programs",
                        "Student referral campaigns"
                    ],
                    "social_media_strategy": [
                        "LinkedIn educational content",
                        "YouTube tutorials"
                    ],
                    "revenue_growth": [
                        "Certification programs",
                        "Premium mentorship subscriptions"
                    ]
                }
            }

        else:

            return {
                "marketing_strategy": {
                    "customer_acquisition": [
                        "Targeted startup communities"
                    ],
                    "social_media_strategy": [
                        "LinkedIn branding",
                        "Content marketing"
                    ],
                    "revenue_growth": [
                        "Strategic partnerships",
                        "Subscription monetization"
                    ]
                }
            }