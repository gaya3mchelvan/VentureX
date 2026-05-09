from backend.ai.gemini_config import client


def analyze_startup_service(data):

    prompt = f"""
    Analyze this startup idea:

    Idea: {data.idea}

    Give:
    - startup strengths
    - weaknesses
    - scalability
    - investor attractiveness
    - market fit
    - growth opportunities
    - pitch suggestions
    """

    try:

        response = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=prompt
        )

        return {
            "ai_response": response.text
        }

    except Exception:

        idea = data.idea.lower()

        if "fitness" in idea:

            return {
                "startup_analysis": {
                    "strengths": [
                        "Growing fitness market",
                        "Strong subscription scalability"
                    ],
                    "weaknesses": [
                        "High competition in fitness apps"
                    ],
                    "investor_attractiveness": "Medium to High",
                    "market_fit": "Strong",
                    "scalability": "High growth potential",
                    "risk_level": "Medium",
                    "growth_opportunities": [
                        "AI nutrition integration",
                        "Corporate wellness partnerships"
                    ],
                    "pitch_suggestions": [
                        "Improve differentiation from competitors",
                        "Highlight AI personalization features"
                    ]
                }
            }

        elif "education" in idea or "student" in idea:

            return {
                "startup_analysis": {
                    "strengths": [
                        "Large student user base",
                        "High long-term engagement potential"
                    ],
                    "weaknesses": [
                        "Monetization may take time"
                    ],
                    "investor_attractiveness": "High",
                    "market_fit": "Strong",
                    "scalability": "Excellent scalability",
                    "risk_level": "Low to Medium",
                    "growth_opportunities": [
                        "University partnerships",
                        "AI-based personalized learning"
                    ],
                    "pitch_suggestions": [
                        "Highlight long-term student retention",
                        "Emphasize scalable EdTech model"
                    ]
                }
            }

        else:

            return {
                "startup_analysis": {
                    "strengths": [
                        "Innovative startup concept",
                        "Good scalability potential"
                    ],
                    "weaknesses": [
                        "Competitive market challenges"
                    ],
                    "investor_attractiveness": "Medium",
                    "market_fit": "Moderate",
                    "scalability": "Strong long-term potential",
                    "risk_level": "Medium",
                    "growth_opportunities": [
                        "Strategic partnerships",
                        "Market expansion opportunities"
                    ],
                    "pitch_suggestions": [
                        "Improve differentiation strategy",
                        "Clarify monetization approach"
                    ]
                }
            }