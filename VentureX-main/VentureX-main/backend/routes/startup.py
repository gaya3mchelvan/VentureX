from fastapi import APIRouter
from backend.models.startup_model import StartupRequest
from backend.ai_agents.startup_agent import startup_analysis
from backend.ai_agents.competitor_agent import competitor_analysis
from backend.ai_agents.finance_agent import finance_analysis
from backend.ai_agents.growth_agent import growth_strategy
from backend.ai_agents.workspace_agent import workspace_recommendation
from backend.ai_agents.event_agent import event_recommendation

router = APIRouter()

@router.post("/startup/analyze")
def analyze_startup(data: StartupRequest):

   return startup_analysis(data.dict())

@router.post("/competitor/analyze")
def competitor_analysis(data: dict):

    return competitor_analysis(data)


@router.post("/burnrate/predict")
def burnrate_prediction(data: dict):

    return finance_analysis(data)


@router.post("/events/recommend")
def events_recommend_route(data: dict):

    return event_recommendation(data)

@router.post("/events/create")
def create_event(data: dict):

    return {
        "message": "Event created successfully",
        "event": data
    }

@router.post("/workspace/recommend")
def workspace_recommend_route(data: dict):

    return workspace_recommendation(data)

@router.post("/workspace/create")
def create_workspace(data: dict):

    return {
        "message": "Workspace listed successfully",
        "workspace": data
    }

@router.post("/marketing/strategy")
def marketing_strategy(data: dict):

    return growth_strategy(data)