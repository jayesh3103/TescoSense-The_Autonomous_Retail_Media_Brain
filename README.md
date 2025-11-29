# TescoSense – The Autonomous Retail Media Brain 🧠🛒

> **Participant of the Tesco Retail Media Innovation Jam**

TescoSense is a cutting-edge **Autonomous Multi-Agent System** designed to revolutionize retail media. It acts as an intelligent "brain" that autonomously senses market conditions, strategies campaigns, generates creative assets, and books media slots in real-time.

Powered by **FastAPI**, **LangChain**, and a stunning **Next.js 3D Dashboard**, TescoSense brings the future of retail media management to life.

---

## 🚀 Key Features

- **🤖 Multi-Agent Architecture**: Five specialized AI agents working in harmony:
  - **Sensing Agent**: Monitors real-time data (weather, sales trends, inventory) to detect opportunities.
  - **Strategy Agent**: Formulates high-impact campaign strategies based on sensing data.
  - **Creative Agent**: Generates ad copy and visual concepts on the fly.
  - **Booking Agent**: Simulates the negotiation and booking of ad slots.
  - **Learning Agent**: Analyzes performance to continuously improve future decisions.
- **✨ Immersive 3D Dashboard**: A futuristic, high-performance UI built with **React Three Fiber** and **Tailwind CSS** to visualize the agents' thought processes and actions.
- **⚡ Real-Time Simulation**: Watch the AI brain "think" and act as it processes live data streams.
- **📊 Enterprise-Grade Analytics**: Detailed KPI tracking and campaign performance metrics.

---

## 🛠️ Tech Stack

### Backend (The Brain)

- **Language**: Python 3.11+
- **Framework**: FastAPI
- **AI/Orchestration**: LangChain, LangGraph
- **Database**: SQLite (SQLAlchemy)
- **Data Processing**: Pandas, NumPy

### Frontend (The Face)

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **3D Graphics**: Three.js, React Three Fiber, Drei
- **UI Components**: Radix UI, Lucide React

### DevOps & Tools

- **Containerization**: Docker, Docker Compose
- **Package Managers**: pip (Python), npm (Node.js)

---

## 🏁 Getting Started

You can run TescoSense using Docker (recommended) or set it up manually.

### Option 1: Docker (Recommended 🐳)

The easiest way to get up and running.

1.  **Clone the repository**:

    ```bash
    git clone https://github.com/jayesh3103/TescoSense-The_Autonomous_Retail_Media_Brain.git
    cd TescoSense-The_Autonomous_Retail_Media_Brain
    ```

2.  **Build and Run**:

    ```bash
    docker-compose up --build
    ```

3.  **Access the App**:
    - **Dashboard**: [http://localhost:3000](http://localhost:3000)
    - **API Documentation**: [http://localhost:8000/docs](http://localhost:8000/docs)

### Option 2: Manual Setup 🛠️

If you prefer running services individually for development.

#### 1. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run the server
uvicorn app.main:app --reload
```

The backend will start at `http://localhost:8000`.

#### 2. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Run the development server
npm run dev
```

The frontend will start at `http://localhost:3000`.

---

## 📂 Project Structure

```
tescosense/
├── backend/                # FastAPI Backend
│   ├── app/
│   │   ├── agents/         # AI Agent Logic (Sensing, Strategy, etc.)
│   │   ├── api/            # API Routes
│   │   ├── core/           # Config & Database
│   │   └── main.py         # Entry point
│   ├── Dockerfile
│   └── requirements.txt
├── frontend/               # Next.js Frontend
│   ├── src/
│   │   ├── components/     # UI & 3D Components
│   │   ├── app/            # Next.js Pages
│   │   └── lib/            # Utilities
│   ├── Dockerfile
│   └── package.json
├── docs/                   # Documentation
├── docker-compose.yml      # Docker orchestration
└── README.md               # You are here
```

## 🧪 Running Simulations

You can trigger the autonomous agents directly from the dashboard or run a manual end-to-end test script:

```bash
# Ensure backend is running
python test_e2e.py
```

## 👥 Team

Built with ❤️ for the **Tesco Retail Media Innovation Jam**.

---

_Note: This project is a prototype developed for a hackathon and demonstrates the potential of autonomous AI in retail media._
