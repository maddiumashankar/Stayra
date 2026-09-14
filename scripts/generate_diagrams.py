#!/usr/bin/env python3
"""
Stayra Architecture Diagram Generator
Generates high-resolution, production-grade SVG diagrams for TECHNICAL_ARCHITECTURE.md
"""

import os

OUTPUT_DIR = "/Users/shipsy/Desktop/Stayra/docs/architecture/assets"
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Common styling definitions
DEFS = """
<defs>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&amp;family=JetBrains+Mono:wght@400;500;600&amp;display=swap');
        * { font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
        .mono { font-family: 'JetBrains Mono', monospace; }
        .shadow { filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.08)); }
        .shadow-lg { filter: drop-shadow(0 10px 25px rgba(0, 0, 0, 0.12)); }
    </style>
    
    <filter id="card-shadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="4" stdDeviation="6" flood-opacity="0.06" flood-color="#0F172A"/>
    </filter>

    <marker id="arrow-indigo" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#6366F1"/>
    </marker>
    <marker id="arrow-emerald" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#10B981"/>
    </marker>
    <marker id="arrow-amber" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#F59E0B"/>
    </marker>
    <marker id="arrow-rose" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#F43F5E"/>
    </marker>
    <marker id="arrow-slate" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#64748B"/>
    </marker>
    <marker id="arrow-blue" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#0284C7"/>
    </marker>

    <!-- Gradients -->
    <linearGradient id="bg-canvas" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#F8FAFC"/>
        <stop offset="100%" stop-color="#F1F5F9"/>
    </linearGradient>
    <linearGradient id="grad-indigo" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#6366F1"/>
        <stop offset="100%" stop-color="#4F46E5"/>
    </linearGradient>
    <linearGradient id="grad-emerald" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#10B981"/>
        <stop offset="100%" stop-color="#059669"/>
    </linearGradient>
    <linearGradient id="grad-amber" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#F59E0B"/>
        <stop offset="100%" stop-color="#D97706"/>
    </linearGradient>
    <linearGradient id="grad-rose" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#F43F5E"/>
        <stop offset="100%" stop-color="#E11D48"/>
    </linearGradient>
    <linearGradient id="grad-blue" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0EA5E9"/>
        <stop offset="100%" stop-color="#0284C7"/>
    </linearGradient>
    <linearGradient id="grad-purple" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#A855F7"/>
        <stop offset="100%" stop-color="#7E22CE"/>
    </linearGradient>
    <linearGradient id="grad-dark" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#1E293B"/>
        <stop offset="100%" stop-color="#0F172A"/>
    </linearGradient>
</defs>
"""

# -------------------------------------------------------------
# DIAGRAM 1: High-Level System Topology & Component Architecture
# -------------------------------------------------------------
def generate_diagram_1():
    svg = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1400 900" width="100%" height="100%">
{DEFS}
    <!-- Background Canvas -->
    <rect width="1400" height="900" fill="url(#bg-canvas)" rx="16"/>
    <rect x="20" y="20" width="1360" height="860" fill="none" stroke="#E2E8F0" stroke-width="1.5" rx="12"/>

    <!-- Header -->
    <rect x="40" y="40" width="1320" height="60" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1" rx="8" filter="url(#card-shadow)"/>
    <circle cx="70" cy="70" r="16" fill="url(#grad-indigo)"/>
    <text x="70" y="75" fill="#FFFFFF" font-weight="800" font-size="14" text-anchor="middle">S</text>
    <text x="100" y="68" fill="#0F172A" font-weight="700" font-size="18">Stayra — High-Level System Architecture &amp; Component Topology</text>
    <text x="100" y="86" fill="#64748B" font-weight="500" font-size="13">C4 Container Architecture: Mobile Clients, NestJS Modular Monolith, Data Stores &amp; Async Workers</text>
    <rect x="1220" y="55" width="120" height="30" fill="#EEF2FF" rx="6"/>
    <text x="1280" y="74" fill="#4F46E5" font-weight="600" font-size="12" text-anchor="middle">VERSION 1.0</text>

    <!-- SECTION 1: Client Application Layer -->
    <rect x="40" y="125" width="340" height="735" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1" rx="10" filter="url(#card-shadow)"/>
    <path d="M 40 135 Q 40 125 50 125 L 370 125 Q 380 125 380 135 L 380 165 L 40 165 Z" fill="#F8FAFC"/>
    <text x="60" y="150" fill="#0F172A" font-weight="700" font-size="15">1. Client Application Layer</text>
    <text x="360" y="150" fill="#6366F1" font-weight="600" font-size="12" text-anchor="end">React Native / Expo</text>

    <!-- Client Card 1: Resident Mobile -->
    <g transform="translate(60, 185)">
        <rect width="300" height="130" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1" rx="8"/>
        <rect x="12" y="12" width="28" height="28" fill="#EEF2FF" rx="6"/>
        <text x="26" y="31" fill="#6366F1" font-size="14" text-anchor="middle">📱</text>
        <text x="50" y="26" fill="#0F172A" font-weight="700" font-size="14">Resident Mobile App</text>
        <text x="50" y="42" fill="#64748B" font-size="11">React Native (Expo Router v3)</text>
        <line x1="12" y1="52" x2="288" y2="52" stroke="#E2E8F0" stroke-width="1"/>
        <text x="16" y="72" fill="#334155" font-size="11">• PostGIS Discovery &amp; Natural Search</text>
        <text x="16" y="90" fill="#334155" font-size="11">• Digital Tenancy &amp; Agreement Signing</text>
        <text x="16" y="108" fill="#334155" font-size="11">• Razorpay Checkout &amp; Ticket Tracking</text>
    </g>

    <!-- Client Card 2: Owner Mobile -->
    <g transform="translate(60, 335)">
        <rect width="300" height="130" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1" rx="8"/>
        <rect x="12" y="12" width="28" height="28" fill="#ECFDF5" rx="6"/>
        <text x="26" y="31" fill="#10B981" font-size="14" text-anchor="middle">🏢</text>
        <text x="50" y="26" fill="#0F172A" font-weight="700" font-size="14">Owner Mobile &amp; Portal</text>
        <text x="50" y="42" fill="#64748B" font-size="11">Expo Router + Web Responsive</text>
        <line x1="12" y1="52" x2="288" y2="52" stroke="#E2E8F0" stroke-width="1"/>
        <text x="16" y="72" fill="#334155" font-size="11">• Property &amp; Room Bed Grid Management</text>
        <text x="16" y="90" fill="#334155" font-size="11">• Request Approvals &amp; Tenancy Activation</text>
        <text x="16" y="108" fill="#334155" font-size="11">• Billing Runs &amp; Ticket Staff Assignment</text>
    </g>

    <!-- Client Card 3: Staff App -->
    <g transform="translate(60, 485)">
        <rect width="300" height="110" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1" rx="8"/>
        <rect x="12" y="12" width="28" height="28" fill="#FFFBEB" rx="6"/>
        <text x="26" y="31" fill="#F59E0B" font-size="14" text-anchor="middle">🔧</text>
        <text x="50" y="26" fill="#0F172A" font-weight="700" font-size="14">Staff Operations App</text>
        <text x="50" y="42" fill="#64748B" font-size="11">Lightweight Mobile Flow</text>
        <line x1="12" y1="52" x2="288" y2="52" stroke="#E2E8F0" stroke-width="1"/>
        <text x="16" y="72" fill="#334155" font-size="11">• Assigned Ticket Kanban Queue</text>
        <text x="16" y="90" fill="#334155" font-size="11">• Upload Resolution Photos &amp; Proofs</text>
    </g>

    <!-- Client Card 4: Shared Mobile Architecture -->
    <g transform="translate(60, 615)">
        <rect width="300" height="225" fill="#F1F5F9" stroke="#CBD5E1" stroke-width="1" rx="8"/>
        <text x="16" y="26" fill="#0F172A" font-weight="700" font-size="13">Mobile Architecture Foundations</text>
        <rect x="16" y="40" width="125" height="36" fill="#FFFFFF" stroke="#E2E8F0" rx="4"/>
        <text x="78" y="62" fill="#4F46E5" font-weight="600" font-size="11" text-anchor="middle">TanStack Query v5</text>

        <rect x="155" y="40" width="125" height="36" fill="#FFFFFF" stroke="#E2E8F0" rx="4"/>
        <text x="217" y="62" fill="#059669" font-weight="600" font-size="11" text-anchor="middle">Zustand Stores</text>

        <rect x="16" y="85" width="125" height="36" fill="#FFFFFF" stroke="#E2E8F0" rx="4"/>
        <text x="78" y="107" fill="#D97706" font-weight="600" font-size="11" text-anchor="middle">Zod Form Schemas</text>

        <rect x="155" y="85" width="125" height="36" fill="#FFFFFF" stroke="#E2E8F0" rx="4"/>
        <text x="217" y="107" fill="#0284C7" font-weight="600" font-size="11" text-anchor="middle">Expo SecureStore</text>

        <rect x="16" y="130" width="264" height="75" fill="#FFFFFF" stroke="#E2E8F0" rx="4"/>
        <text x="26" y="152" fill="#0F172A" font-weight="600" font-size="11">Network &amp; Security Layer:</text>
        <text x="26" y="172" fill="#64748B" font-size="10">• Axios with JWT Interceptor + Mutex Refresh</text>
        <text x="26" y="190" fill="#64748B" font-size="10">• Offline Mutation Queue &amp; Optimistic UI</text>
    </g>

    <!-- SECTION 2: API Gateway & Modular Monolith -->
    <rect x="415" y="125" width="570" height="735" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1" rx="10" filter="url(#card-shadow)"/>
    <path d="M 415 135 Q 415 125 425 125 L 975 125 Q 985 125 985 135 L 985 165 L 415 165 Z" fill="#F8FAFC"/>
    <text x="435" y="150" fill="#0F172A" font-weight="700" font-size="15">2. Backend Modular Monolith (NestJS / Node.js)</text>
    <text x="965" y="150" fill="#10B981" font-weight="600" font-size="12" text-anchor="end">Clean Architecture</text>

    <!-- Ingress Layer inside Backend -->
    <g transform="translate(435, 185)">
        <rect width="530" height="55" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1" rx="6"/>
        <text x="16" y="24" fill="#0F172A" font-weight="700" font-size="12">API Gateway &amp; Middleware Boundary</text>
        <text x="16" y="42" fill="#64748B" font-size="11">Rate Limiting (Redis) • JWT AuthGuard • RBAC Guard • PropertyOwnershipGuard</text>
    </g>

    <!-- Bounded Context Modules Grid -->
    <g transform="translate(435, 255)">
        <!-- Module 1: Auth -->
        <rect x="0" y="0" width="165" height="90" fill="#FFFFFF" stroke="#6366F1" stroke-width="1.5" rx="6"/>
        <text x="12" y="22" fill="#4F46E5" font-weight="700" font-size="12">Auth &amp; Users</text>
        <text x="12" y="42" fill="#64748B" font-size="10">• Phone OTP &amp; JWT</text>
        <text x="12" y="58" fill="#64748B" font-size="10">• Stayra Resident ID</text>
        <text x="12" y="74" fill="#64748B" font-size="10">• KYC Verification</text>

        <!-- Module 2: Property & Inventory -->
        <rect x="180" y="0" width="170" height="90" fill="#FFFFFF" stroke="#0EA5E9" stroke-width="1.5" rx="6"/>
        <text x="192" y="22" fill="#0284C7" font-weight="700" font-size="12">Property &amp; Inventory</text>
        <text x="192" y="42" fill="#64748B" font-size="10">• PostGIS Spatial Index</text>
        <text x="192" y="58" fill="#64748B" font-size="10">• Room &amp; Bed Allocations</text>
        <text x="192" y="74" fill="#64748B" font-size="10">• Amenities &amp; Food Menus</text>

        <!-- Module 3: Tenancy -->
        <rect x="365" y="0" width="165" height="90" fill="#FFFFFF" stroke="#10B981" stroke-width="1.5" rx="6"/>
        <text x="377" y="22" fill="#059669" font-weight="700" font-size="12">Tenancy Lifecycle</text>
        <text x="377" y="42" fill="#64748B" font-size="10">• Request &amp; Approve</text>
        <text x="377" y="58" fill="#64748B" font-size="10">• Digital Tenancy Agmt</text>
        <text x="377" y="74" fill="#64748B" font-size="10">• 30-Day Move-Out Notice</text>

        <!-- Module 4: Billing -->
        <rect x="0" y="105" width="165" height="95" fill="#FFFFFF" stroke="#F59E0B" stroke-width="1.5" rx="6"/>
        <text x="12" y="127" fill="#D97706" font-weight="700" font-size="12">Billing &amp; Metering</text>
        <text x="12" y="147" fill="#64748B" font-size="10">• Monthly Bill Scheduler</text>
        <text x="12" y="163" fill="#64748B" font-size="10">• Sub-meter Electricity</text>
        <text x="12" y="179" fill="#64748B" font-size="10">• Deduct SLA Credits</text>

        <!-- Module 5: Double-Entry Ledger -->
        <rect x="180" y="105" width="170" height="95" fill="#FFFFFF" stroke="#8B5CF6" stroke-width="1.5" rx="6"/>
        <text x="192" y="127" fill="#7C3AED" font-weight="700" font-size="12">Financial Ledger</text>
        <text x="192" y="147" fill="#64748B" font-size="10">• Double-Entry Entries</text>
        <text x="192" y="163" fill="#64748B" font-size="10">• Idempotent Postings</text>
        <text x="192" y="179" fill="#64748B" font-size="10">• Audit Trail Ledger</text>

        <!-- Module 6: Payments -->
        <rect x="365" y="105" width="165" height="95" fill="#FFFFFF" stroke="#059669" stroke-width="1.5" rx="6"/>
        <text x="377" y="127" fill="#047857" font-weight="700" font-size="12">Payments &amp; Escrow</text>
        <text x="377" y="147" fill="#64748B" font-size="10">• Razorpay Orders</text>
        <text x="377" y="163" fill="#64748B" font-size="10">• Webhook HMAC Verify</text>
        <text x="377" y="179" fill="#64748B" font-size="10">• Security Deposit Hold</text>

        <!-- Module 7: Complaints -->
        <rect x="0" y="215" width="165" height="95" fill="#FFFFFF" stroke="#F43F5E" stroke-width="1.5" rx="6"/>
        <text x="12" y="237" fill="#E11D48" font-weight="700" font-size="12">Complaints &amp; Tickets</text>
        <text x="12" y="257" fill="#64748B" font-size="10">• Multi-modal Media</text>
        <text x="12" y="273" fill="#64748B" font-size="10">• Staff Task Assignment</text>
        <text x="12" y="289" fill="#64748B" font-size="10">• Resolution Workflows</text>

        <!-- Module 8: SLA & Compensation Engine -->
        <rect x="180" y="215" width="170" height="95" fill="#FFFFFF" stroke="#EF4444" stroke-width="1.5" rx="6"/>
        <text x="192" y="237" fill="#B91C1C" font-weight="700" font-size="12">SLA Compensation</text>
        <text x="192" y="257" fill="#64748B" font-size="10">• Policy Rules Evaluator</text>
        <text x="192" y="273" fill="#64748B" font-size="10">• Auto Rent Credit Calc</text>
        <text x="192" y="289" fill="#64748B" font-size="10">• SLA Breach Monitor</text>

        <!-- Module 9: Feedback & Reputation -->
        <rect x="365" y="215" width="165" height="95" fill="#FFFFFF" stroke="#D97706" stroke-width="1.5" rx="6"/>
        <text x="377" y="237" fill="#B45309" font-weight="700" font-size="12">Feedback &amp; Rating</text>
        <text x="377" y="257" fill="#64748B" font-size="10">• Post-ticket Surveys</text>
        <text x="377" y="273" fill="#64748B" font-size="10">• Living PG Reputation</text>
        <text x="377" y="289" fill="#64748B" font-size="10">• SLA Adherence Index</text>
    </g>

    <!-- Sub-Section: AI Gateway & Specialized Agents -->
    <g transform="translate(435, 595)">
        <rect width="530" height="245" fill="#F8FAFC" stroke="#6366F1" stroke-width="1.5" rx="8"/>
        <rect x="16" y="12" width="500" height="32" fill="#EEF2FF" rx="4"/>
        <text x="26" y="33" fill="#4F46E5" font-weight="700" font-size="13">STAYRA AI GATEWAY &amp; TOOL CALLING ORCHESTRATOR</text>
        <text x="500" y="33" fill="#6366F1" font-weight="600" font-size="11" text-anchor="end">Deterministic Safety Guardrail Layer</text>

        <!-- 4 Specialized Agents Cards -->
        <rect x="16" y="55" width="115" height="85" fill="#FFFFFF" stroke="#CBD5E1" rx="6"/>
        <text x="73" y="75" fill="#0F172A" font-weight="700" font-size="11" text-anchor="middle">Recommendation</text>
        <text x="73" y="90" fill="#6366F1" font-size="9" text-anchor="middle">Natural Language Search</text>
        <text x="73" y="105" fill="#64748B" font-size="9" text-anchor="middle">• PostGIS Geo Filters</text>
        <text x="73" y="118" fill="#64748B" font-size="9" text-anchor="middle">• Multi-factor Ranks</text>

        <rect x="143" y="55" width="115" height="85" fill="#FFFFFF" stroke="#CBD5E1" rx="6"/>
        <text x="200" y="75" fill="#0F172A" font-weight="700" font-size="11" text-anchor="middle">Complaint Triage</text>
        <text x="200" y="90" fill="#E11D48" font-size="9" text-anchor="middle">Classification Agent</text>
        <text x="200" y="105" fill="#64748B" font-size="9" text-anchor="middle">• Severity Detection</text>
        <text x="200" y="118" fill="#64748B" font-size="9" text-anchor="middle">• SLA Mapping</text>

        <rect x="270" y="55" width="115" height="85" fill="#FFFFFF" stroke="#CBD5E1" rx="6"/>
        <text x="327" y="75" fill="#0F172A" font-weight="700" font-size="11" text-anchor="middle">Billing Anomaly</text>
        <text x="327" y="90" fill="#D97706" font-size="9" text-anchor="middle">Audit &amp; Spike Agent</text>
        <text x="327" y="105" fill="#64748B" font-size="9" text-anchor="middle">• Meter Spike Detect</text>
        <text x="327" y="118" fill="#64748B" font-size="9" text-anchor="middle">• Duplicate Check</text>

        <rect x="398" y="55" width="118" height="85" fill="#FFFFFF" stroke="#CBD5E1" rx="6"/>
        <text x="457" y="75" fill="#0F172A" font-weight="700" font-size="11" text-anchor="middle">Owner Copilot</text>
        <text x="457" y="90" fill="#059669" font-size="9" text-anchor="middle">Analytics Agent</text>
        <text x="457" y="105" fill="#64748B" font-size="9" text-anchor="middle">• Occupancy Trends</text>
        <text x="457" y="118" fill="#64748B" font-size="9" text-anchor="middle">• Recurring Issues</text>

        <!-- Guardrail Banner -->
        <rect x="16" y="150" width="500" height="80" fill="#FFFFFF" stroke="#E2E8F0" rx="6"/>
        <text x="26" y="172" fill="#0F172A" font-weight="700" font-size="11">Core AI Architectural Invariants:</text>
        <text x="26" y="190" fill="#DC2626" font-weight="600" font-size="10">🚫 Zero Direct Database Mutation:</text>
        <text x="210" y="190" fill="#64748B" font-size="10">AI agents are strictly read-only or draft-only.</text>
        <text x="26" y="208" fill="#059669" font-weight="600" font-size="10">✓ Deterministic Execution:</text>
        <text x="175" y="208" fill="#64748B" font-size="10">All monetary ledger debits/credits executed via verified code.</text>
    </g>

    <!-- SECTION 3: Data Stores & Async Workers -->
    <rect x="1015" y="125" width="345" height="735" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1" rx="10" filter="url(#card-shadow)"/>
    <path d="M 1015 135 Q 1015 125 1025 125 L 1350 125 Q 1360 125 1360 135 L 1360 165 L 1015 165 Z" fill="#F8FAFC"/>
    <text x="1035" y="150" fill="#0F172A" font-weight="700" font-size="15">3. Data Stores &amp; Background Workers</text>

    <!-- Data Store 1: PostgreSQL -->
    <g transform="translate(1035, 185)">
        <rect width="305" height="135" fill="#F8FAFC" stroke="#0284C7" stroke-width="1.5" rx="8"/>
        <rect x="12" y="12" width="28" height="28" fill="#E0F2FE" rx="6"/>
        <text x="26" y="31" fill="#0284C7" font-size="14" text-anchor="middle">🗄️</text>
        <text x="50" y="26" fill="#0F172A" font-weight="700" font-size="14">PostgreSQL 16 Enterprise</text>
        <text x="50" y="42" fill="#64748B" font-size="11">ACID Relational Core</text>
        <line x1="12" y1="52" x2="293" y2="52" stroke="#E2E8F0" stroke-width="1"/>
        <text x="16" y="72" fill="#334155" font-size="11">• <tspan font-weight="600">PostGIS:</tspan> Spatial indices for radius discovery</text>
        <text x="16" y="90" fill="#334155" font-size="11">• <tspan font-weight="600">pgvector:</tspan> Property semantic embeddings</text>
        <text x="16" y="108" fill="#334155" font-size="11">• <tspan font-weight="600">Immutable Ledger:</tspan> Double-entry ledger entries</text>
    </g>

    <!-- Data Store 2: Redis -->
    <g transform="translate(1035, 330)">
        <rect width="305" height="110" fill="#F8FAFC" stroke="#DC2626" stroke-width="1.5" rx="8"/>
        <rect x="12" y="12" width="28" height="28" fill="#FEE2E2" rx="6"/>
        <text x="26" y="31" fill="#DC2626" font-size="14" text-anchor="middle">⚡</text>
        <text x="50" y="26" fill="#0F172A" font-weight="700" font-size="14">Redis 7.2 Cluster</text>
        <text x="50" y="42" fill="#64748B" font-size="11">Cache &amp; Distributed Engine</text>
        <line x1="12" y1="52" x2="293" y2="52" stroke="#E2E8F0" stroke-width="1"/>
        <text x="16" y="72" fill="#334155" font-size="11">• High-speed Session &amp; OTP Throttle Cache</text>
        <text x="16" y="90" fill="#334155" font-size="11">• BullMQ Job Queues &amp; Distributed Mutex Locks</text>
    </g>

    <!-- Data Store 3: Object Storage S3 -->
    <g transform="translate(1035, 450)">
        <rect width="305" height="95" fill="#F8FAFC" stroke="#D97706" stroke-width="1.5" rx="8"/>
        <rect x="12" y="12" width="28" height="28" fill="#FEF3C7" rx="6"/>
        <text x="26" y="31" fill="#D97706" font-size="14" text-anchor="middle">☁️</text>
        <text x="50" y="26" fill="#0F172A" font-weight="700" font-size="14">AWS S3 / Cloudflare R2</text>
        <text x="50" y="42" fill="#64748B" font-size="11">Secure Object Storage</text>
        <line x1="12" y1="52" x2="293" y2="52" stroke="#E2E8F0" stroke-width="1"/>
        <text x="16" y="72" fill="#334155" font-size="11">• Encrypted KYC Docs, Room Photos, Receipts</text>
        <text x="16" y="88" fill="#334155" font-size="11">• Pre-signed Uploads with Short-lived Expiry</text>
    </g>

    <!-- BullMQ Async Workers -->
    <g transform="translate(1035, 555)">
        <rect width="305" height="150" fill="#F8FAFC" stroke="#4F46E5" stroke-width="1.5" rx="8"/>
        <rect x="12" y="12" width="28" height="28" fill="#EEF2FF" rx="6"/>
        <text x="26" y="31" fill="#4F46E5" font-size="14" text-anchor="middle">⚙️</text>
        <text x="50" y="26" fill="#0F172A" font-weight="700" font-size="14">BullMQ Worker Processors</text>
        <text x="50" y="42" fill="#64748B" font-size="11">Asynchronous Job Pipelines</text>
        <line x1="12" y1="52" x2="293" y2="52" stroke="#E2E8F0" stroke-width="1"/>
        <text x="16" y="72" fill="#334155" font-size="11">• <tspan font-weight="600">SLA Monitor Worker:</tspan> Scans tickets every 15m</text>
        <text x="16" y="90" fill="#334155" font-size="11">• <tspan font-weight="600">Billing Worker:</tspan> 1st of month invoice generator</text>
        <text x="16" y="108" fill="#334155" font-size="11">• <tspan font-weight="600">Push Dispatcher:</tspan> FCM/APNs batch sender</text>
        <text x="16" y="126" fill="#334155" font-size="11">• <tspan font-weight="600">AI Task Worker:</tspan> Batch embedding recalculation</text>
    </g>

    <!-- External Integrations Card -->
    <g transform="translate(1035, 715)">
        <rect width="305" height="125" fill="#F8FAFC" stroke="#059669" stroke-width="1.5" rx="8"/>
        <text x="16" y="24" fill="#0F172A" font-weight="700" font-size="12">External Platform Services</text>
        <line x1="12" y1="36" x2="293" y2="36" stroke="#E2E8F0" stroke-width="1"/>
        <text x="16" y="56" fill="#334155" font-size="11">• <tspan font-weight="600">Payments:</tspan> Razorpay / Stripe Webhook Gateway</text>
        <text x="16" y="76" fill="#334155" font-size="11">• <tspan font-weight="600">Messaging:</tspan> Twilio / MSG91 (OTP &amp; SMS alerts)</text>
        <text x="16" y="96" fill="#334155" font-size="11">• <tspan font-weight="600">LLM Inference:</tspan> OpenAI / Anthropic / Gemini API</text>
        <text x="16" y="114" fill="#334155" font-size="11">• <tspan font-weight="600">Push:</tspan> Apple APNs &amp; Google FCM</text>
    </g>

    <!-- Flow Arrows between Layers -->
    <!-- Client to Backend -->
    <path d="M 380 250 L 415 250" stroke="#6366F1" stroke-width="2" marker-end="url(#arrow-indigo)"/>
    <path d="M 380 400 L 415 400" stroke="#10B981" stroke-width="2" marker-end="url(#arrow-emerald)"/>
    <path d="M 380 540 L 415 540" stroke="#F59E0B" stroke-width="2" marker-end="url(#arrow-amber)"/>

    <!-- Backend to Database -->
    <path d="M 985 300 L 1035 250" stroke="#0284C7" stroke-width="2" marker-end="url(#arrow-blue)"/>
    <!-- Backend to Redis -->
    <path d="M 985 410 L 1035 385" stroke="#DC2626" stroke-width="2" marker-end="url(#arrow-rose)"/>
    <!-- Backend to Workers -->
    <path d="M 985 580 L 1035 630" stroke="#4F46E5" stroke-width="2" marker-end="url(#arrow-indigo)"/>
</svg>"""
    return svg

# -------------------------------------------------------------
# DIAGRAM 2: End-to-End Visual Data Flow Diagram (DFD Level 1)
# -------------------------------------------------------------
def generate_diagram_2():
    svg = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1400 950" width="100%" height="100%">
{DEFS}
    <!-- Background Canvas -->
    <rect width="1400" height="950" fill="url(#bg-canvas)" rx="16"/>
    <rect x="20" y="20" width="1360" height="910" fill="none" stroke="#E2E8F0" stroke-width="1.5" rx="12"/>

    <!-- Header -->
    <rect x="40" y="40" width="1320" height="60" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1" rx="8" filter="url(#card-shadow)"/>
    <circle cx="70" cy="70" r="16" fill="url(#grad-emerald)"/>
    <text x="70" y="75" fill="#FFFFFF" font-weight="800" font-size="14" text-anchor="middle">F</text>
    <text x="100" y="68" fill="#0F172A" font-weight="700" font-size="18">Stayra — End-to-End Visual Data Flow Diagram (DFD Level 1)</text>
    <text x="100" y="86" fill="#64748B" font-weight="500" font-size="13">Complete Operational Lifecycle: Discover → Tenancy → Monthly Rent → Complaints → SLA Credit → Reputation</text>
    <rect x="1200" y="55" width="140" height="30" fill="#ECFDF5" rx="6"/>
    <text x="1270" y="74" fill="#059669" font-weight="600" font-size="12" text-anchor="middle">DATA FLOW MAP</text>

    <!-- STAGE 1: Discovery & Request -->
    <g transform="translate(50, 125)">
        <rect width="400" height="235" fill="#FFFFFF" stroke="#6366F1" stroke-width="1.5" rx="8" filter="url(#card-shadow)"/>
        <path d="M 0 8 Q 0 0 8 0 L 392 0 Q 400 0 400 8 L 400 35 L 0 35 Z" fill="#EEF2FF"/>
        <text x="16" y="24" fill="#4F46E5" font-weight="700" font-size="13">STAGE 1: GEOSPATIAL &amp; AI DISCOVERY</text>

        <!-- Step 1.1 -->
        <rect x="16" y="45" width="368" height="50" fill="#F8FAFC" stroke="#E2E8F0" rx="4"/>
        <circle cx="34" cy="70" r="10" fill="#6366F1"/>
        <text x="34" y="74" fill="#FFFFFF" font-size="10" font-weight="700" text-anchor="middle">1</text>
        <text x="52" y="64" fill="#0F172A" font-weight="600" font-size="11">Search Request (Voice / Text / Filters)</text>
        <text x="52" y="80" fill="#64748B" font-size="10">Resident inputs budget, sharing type, curfew, and location</text>

        <!-- Step 1.2 -->
        <rect x="16" y="105" width="368" height="50" fill="#F8FAFC" stroke="#E2E8F0" rx="4"/>
        <circle cx="34" cy="130" r="10" fill="#6366F1"/>
        <text x="34" y="134" fill="#FFFFFF" font-size="10" font-weight="700" text-anchor="middle">2</text>
        <text x="52" y="124" fill="#0F172A" font-weight="600" font-size="11">AI Intent Extraction &amp; PostGIS Spatial Query</text>
        <text x="52" y="140" fill="#64748B" font-size="10">ST_DWithin(coordinates, point, 3000) + Reputation rank</text>

        <!-- Step 1.3 -->
        <rect x="16" y="165" width="368" height="55" fill="#F8FAFC" stroke="#E2E8F0" rx="4"/>
        <circle cx="34" cy="192" r="10" fill="#6366F1"/>
        <text x="34" y="196" fill="#FFFFFF" font-size="10" font-weight="700" text-anchor="middle">3</text>
        <text x="52" y="184" fill="#0F172A" font-weight="600" font-size="11">Interactive Map &amp; Verified PG Listings</text>
        <text x="52" y="202" fill="#64748B" font-size="10">Displays verified photos, living reputation score, and food menu</text>
    </g>

    <!-- Connector 1 to 2 -->
    <path d="M 450 240 L 500 240" stroke="#6366F1" stroke-width="2.5" marker-end="url(#arrow-indigo)"/>

    <!-- STAGE 2: Tenancy Onboarding -->
    <g transform="translate(500, 125)">
        <rect width="400" height="235" fill="#FFFFFF" stroke="#10B981" stroke-width="1.5" rx="8" filter="url(#card-shadow)"/>
        <path d="M 0 8 Q 0 0 8 0 L 392 0 Q 400 0 400 8 L 400 35 L 0 35 Z" fill="#ECFDF5"/>
        <text x="16" y="24" fill="#059669" font-weight="700" font-size="13">STAGE 2: DIGITAL TENANCY ONBOARDING</text>

        <!-- Step 2.1 -->
        <rect x="16" y="45" width="368" height="50" fill="#F8FAFC" stroke="#E2E8F0" rx="4"/>
        <circle cx="34" cy="70" r="10" fill="#10B981"/>
        <text x="34" y="74" fill="#FFFFFF" font-size="10" font-weight="700" text-anchor="middle">4</text>
        <text x="52" y="64" fill="#0F172A" font-weight="600" font-size="11">Digital Room Request Submitted</text>
        <text x="52" y="80" fill="#64748B" font-size="10">Resident attaches Stayra Resident ID &amp; KYC status</text>

        <!-- Step 2.2 -->
        <rect x="16" y="105" width="368" height="50" fill="#F8FAFC" stroke="#E2E8F0" rx="4"/>
        <circle cx="34" cy="130" r="10" fill="#10B981"/>
        <text x="34" y="134" fill="#FFFFFF" font-size="10" font-weight="700" text-anchor="middle">5</text>
        <text x="52" y="124" fill="#0F172A" font-weight="600" font-size="11">Owner Review &amp; Instant Bed Allocation</text>
        <text x="52" y="140" fill="#64748B" font-size="10">Bed status toggled to RESERVED; contract drafted</text>

        <!-- Step 2.3 -->
        <rect x="16" y="165" width="368" height="55" fill="#F8FAFC" stroke="#E2E8F0" rx="4"/>
        <circle cx="34" cy="192" r="10" fill="#10B981"/>
        <text x="34" y="196" fill="#FFFFFF" font-size="10" font-weight="700" text-anchor="middle">6</text>
        <text x="52" y="184" fill="#0F172A" font-weight="600" font-size="11">Deposit Payment &amp; Agreement Signed</text>
        <text x="52" y="202" fill="#64748B" font-size="10">Bed status moves to OCCUPIED; tenancy status = ACTIVE</text>
    </g>

    <!-- Connector 2 to 3 -->
    <path d="M 900 240 L 950 240" stroke="#10B981" stroke-width="2.5" marker-end="url(#arrow-emerald)"/>

    <!-- STAGE 3: Rent Automation & Ledger -->
    <g transform="translate(950, 125)">
        <rect width="400" height="235" fill="#FFFFFF" stroke="#F59E0B" stroke-width="1.5" rx="8" filter="url(#card-shadow)"/>
        <path d="M 0 8 Q 0 0 8 0 L 392 0 Q 400 0 400 8 L 400 35 L 0 35 Z" fill="#FFFBEB"/>
        <text x="16" y="24" fill="#D97706" font-weight="700" font-size="13">STAGE 3: RENT AUTOMATION &amp; LEDGER</text>

        <!-- Step 3.1 -->
        <rect x="16" y="45" width="368" height="50" fill="#F8FAFC" stroke="#E2E8F0" rx="4"/>
        <circle cx="34" cy="70" r="10" fill="#F59E0B"/>
        <text x="34" y="74" fill="#FFFFFF" font-size="10" font-weight="700" text-anchor="middle">7</text>
        <text x="52" y="64" fill="#0F172A" font-weight="600" font-size="11">Automated Monthly Billing Cron (1st of Mo)</text>
        <text x="52" y="80" fill="#64748B" font-size="10">Loads Agreed Rent + Metered Electricity + Food charges</text>

        <!-- Step 3.2 -->
        <rect x="16" y="105" width="368" height="50" fill="#F8FAFC" stroke="#E2E8F0" rx="4"/>
        <circle cx="34" cy="130" r="10" fill="#F59E0B"/>
        <text x="34" y="134" fill="#FFFFFF" font-size="10" font-weight="700" text-anchor="middle">8</text>
        <text x="52" y="124" fill="#0F172A" font-weight="600" font-size="11">Deduct Accumulated SLA Compensation</text>
        <text x="52" y="140" fill="#64748B" font-size="10">Subtracts unapplied service credits directly from total</text>

        <!-- Step 3.3 -->
        <rect x="16" y="165" width="368" height="55" fill="#F8FAFC" stroke="#E2E8F0" rx="4"/>
        <circle cx="34" cy="192" r="10" fill="#F59E0B"/>
        <text x="34" y="196" fill="#FFFFFF" font-size="10" font-weight="700" text-anchor="middle">9</text>
        <text x="52" y="184" fill="#0F172A" font-weight="600" font-size="11">Double-Entry Posting &amp; Payment Gateway</text>
        <text x="52" y="202" fill="#64748B" font-size="10">Razorpay webhook reconciles ledger to 0 balance</text>
    </g>

    <!-- Downward Route from Stage 3 to Stage 4 -->
    <path d="M 1150 360 L 1150 410" stroke="#F59E0B" stroke-width="2.5" marker-end="url(#arrow-amber)"/>

    <!-- STAGE 4: Complaint & AI Triage -->
    <g transform="translate(950, 410)">
        <rect width="400" height="235" fill="#FFFFFF" stroke="#F43F5E" stroke-width="1.5" rx="8" filter="url(#card-shadow)"/>
        <path d="M 0 8 Q 0 0 8 0 L 392 0 Q 400 0 400 8 L 400 35 L 0 35 Z" fill="#FFE4E6"/>
        <text x="16" y="24" fill="#E11D48" font-weight="700" font-size="13">STAGE 4: COMPLAINT &amp; AI TRIAGE</text>

        <!-- Step 4.1 -->
        <rect x="16" y="45" width="368" height="50" fill="#F8FAFC" stroke="#E2E8F0" rx="4"/>
        <circle cx="34" cy="70" r="10" fill="#F43F5E"/>
        <text x="34" y="74" fill="#FFFFFF" font-size="10" font-weight="700" text-anchor="middle">10</text>
        <text x="52" y="64" fill="#0F172A" font-weight="600" font-size="11">Resident Logs Complaint (Text / Photo / Audio)</text>
        <text x="52" y="80" fill="#64748B" font-size="10">e.g., "WiFi down on 3rd floor since yesterday afternoon"</text>

        <!-- Step 4.2 -->
        <rect x="16" y="105" width="368" height="50" fill="#F8FAFC" stroke="#E2E8F0" rx="4"/>
        <circle cx="34" cy="130" r="10" fill="#F43F5E"/>
        <text x="34" y="134" fill="#FFFFFF" font-size="10" font-weight="700" text-anchor="middle">11</text>
        <text x="52" y="124" fill="#0F172A" font-weight="600" font-size="11">AI Classification &amp; Severity Assignment</text>
        <text x="52" y="140" fill="#64748B" font-size="10">Detects category: WIFI, Severity: MEDIUM, SLA: 24 Hours</text>

        <!-- Step 4.3 -->
        <rect x="16" y="165" width="368" height="55" fill="#F8FAFC" stroke="#E2E8F0" rx="4"/>
        <circle cx="34" cy="192" r="10" fill="#F43F5E"/>
        <text x="34" y="196" fill="#FFFFFF" font-size="10" font-weight="700" text-anchor="middle">12</text>
        <text x="52" y="184" fill="#0F172A" font-weight="600" font-size="11">Ticket Broadcast to Property Staff</text>
        <text x="52" y="202" fill="#64748B" font-size="10">Push alerts sent to staff; SLA countdown timer starts</text>
    </g>

    <!-- Connector 4 to 5 (Going Left) -->
    <path d="M 950 527 L 900 527" stroke="#F43F5E" stroke-width="2.5" marker-end="url(#arrow-rose)"/>

    <!-- STAGE 5: SLA Breach & Rent Compensation Engine -->
    <g transform="translate(500, 410)">
        <rect width="400" height="235" fill="#FFFFFF" stroke="#DC2626" stroke-width="1.5" rx="8" filter="url(#card-shadow)"/>
        <path d="M 0 8 Q 0 0 8 0 L 392 0 Q 400 0 400 8 L 400 35 L 0 35 Z" fill="#FEE2E2"/>
        <text x="16" y="24" fill="#B91C1C" font-weight="700" font-size="13">STAGE 5: SLA BREACH &amp; COMPENSATION ENGINE</text>

        <!-- Step 5.1 -->
        <rect x="16" y="45" width="368" height="50" fill="#F8FAFC" stroke="#E2E8F0" rx="4"/>
        <circle cx="34" cy="70" r="10" fill="#DC2626"/>
        <text x="34" y="74" fill="#FFFFFF" font-size="10" font-weight="700" text-anchor="middle">13</text>
        <text x="52" y="64" fill="#0F172A" font-weight="600" font-size="11">BullMQ Worker Heartbeat (Every 15 mins)</text>
        <text x="52" y="80" fill="#64748B" font-size="10">Scans all open tickets against configured sla_target_time</text>

        <!-- Step 5.2 -->
        <rect x="16" y="105" width="368" height="50" fill="#F8FAFC" stroke="#E2E8F0" rx="4"/>
        <circle cx="34" cy="130" r="10" fill="#DC2626"/>
        <text x="34" y="134" fill="#FFFFFF" font-size="10" font-weight="700" text-anchor="middle">14</text>
        <text x="52" y="124" fill="#0F172A" font-weight="600" font-size="11">Deterministic Compensation Calculation</text>
        <text x="52" y="140" fill="#64748B" font-size="10">Formula: ceil(breach_hours / 24) × ₹100/day policy rate</text>

        <!-- Step 5.3 -->
        <rect x="16" y="165" width="368" height="55" fill="#F8FAFC" stroke="#E2E8F0" rx="4"/>
        <circle cx="34" cy="192" r="10" fill="#DC2626"/>
        <text x="34" y="196" fill="#FFFFFF" font-size="10" font-weight="700" text-anchor="middle">15</text>
        <text x="52" y="184" fill="#0F172A" font-weight="600" font-size="11">Service Credit Issued to Ledger</text>
        <text x="52" y="202" fill="#64748B" font-size="10">Resident notified: "SLA breached. ₹100 credit credited."</text>
    </g>

    <!-- Connector 5 to 6 (Going Left) -->
    <path d="M 500 527 L 450 527" stroke="#DC2626" stroke-width="2.5" marker-end="url(#arrow-rose)"/>

    <!-- STAGE 6: Feedback & Dynamic PG Reputation -->
    <g transform="translate(50, 410)">
        <rect width="400" height="235" fill="#FFFFFF" stroke="#059669" stroke-width="1.5" rx="8" filter="url(#card-shadow)"/>
        <path d="M 0 8 Q 0 0 8 0 L 392 0 Q 400 0 400 8 L 400 35 L 0 35 Z" fill="#D1FAE5"/>
        <text x="16" y="24" fill="#047857" font-weight="700" font-size="13">STAGE 6: FEEDBACK &amp; LIVING REPUTATION</text>

        <!-- Step 6.1 -->
        <rect x="16" y="45" width="368" height="50" fill="#F8FAFC" stroke="#E2E8F0" rx="4"/>
        <circle cx="34" cy="70" r="10" fill="#059669"/>
        <text x="34" y="74" fill="#FFFFFF" font-size="10" font-weight="700" text-anchor="middle">16</text>
        <text x="52" y="64" fill="#0F172A" font-weight="600" font-size="11">Staff Resolves Ticket with Photo Evidence</text>
        <text x="52" y="80" fill="#64748B" font-size="10">Resident confirms fix or rejects within 24 hours</text>

        <!-- Step 6.2 -->
        <rect x="16" y="105" width="368" height="50" fill="#F8FAFC" stroke="#E2E8F0" rx="4"/>
        <circle cx="34" cy="130" r="10" fill="#059669"/>
        <text x="34" y="134" fill="#FFFFFF" font-size="10" font-weight="700" text-anchor="middle">17</text>
        <text x="52" y="124" fill="#0F172A" font-weight="600" font-size="11">Verified Resident Experience Rating</text>
        <text x="52" y="140" fill="#64748B" font-size="10">Speed, Cleanliness, Staff Courtesy, and Problem Solved</text>

        <!-- Step 6.3 -->
        <rect x="16" y="165" width="368" height="55" fill="#F8FAFC" stroke="#E2E8F0" rx="4"/>
        <circle cx="34" cy="192" r="10" fill="#059669"/>
        <text x="34" y="196" fill="#FFFFFF" font-size="10" font-weight="700" text-anchor="middle">18</text>
        <text x="52" y="184" fill="#0F172A" font-weight="600" font-size="11">Living PG Reputation Score Updated</text>
        <text x="52" y="202" fill="#64748B" font-size="10">Adherence % updated; directly feeds back into Stage 1 ranking</text>
    </g>

    <!-- Feedback Loop Upward Arrow from Stage 6 back to Stage 1 -->
    <path d="M 250 410 L 250 360" stroke="#059669" stroke-width="2.5" marker-end="url(#arrow-emerald)"/>

    <!-- Bottom Architecture Ledger Invariant Summary -->
    <g transform="translate(50, 680)">
        <rect width="1300" height="230" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1.5" rx="10" filter="url(#card-shadow)"/>
        <path d="M 0 10 Q 0 0 10 0 L 1290 0 Q 1300 0 1300 10 L 1300 40 L 0 40 Z" fill="#F8FAFC"/>
        <text x="24" y="26" fill="#0F172A" font-weight="700" font-size="14">CORE DATA INTEGRITY &amp; SECURITY PROTOCOLS</text>

        <g transform="translate(24, 60)">
            <rect width="390" height="150" fill="#F8FAFC" stroke="#E2E8F0" rx="6"/>
            <text x="16" y="26" fill="#4F46E5" font-weight="700" font-size="12">1. Double-Entry Immutability</text>
            <text x="16" y="48" fill="#334155" font-size="11">• Balance is never a single mutable column</text>
            <text x="16" y="68" fill="#334155" font-size="11">• Every transaction logs paired Debit &amp; Credit</text>
            <text x="16" y="88" fill="#334155" font-size="11">• Idempotency keys prevent double charge</text>
            <text x="16" y="108" fill="#334155" font-size="11">• Tamper-proof audit logs for compliance</text>
        </g>

        <g transform="translate(450, 60)">
            <rect width="390" height="150" fill="#F8FAFC" stroke="#E2E8F0" rx="6"/>
            <text x="16" y="26" fill="#DC2626" font-weight="700" font-size="12">2. SLA Rent Credit Automation</text>
            <text x="16" y="48" fill="#334155" font-size="11">• Owners configure policy upfront in agreement</text>
            <text x="16" y="68" fill="#334155" font-size="11">• Timers tracked independently by BullMQ</text>
            <text x="16" y="88" fill="#334155" font-size="11">• Pure TypeScript math (no LLM hallucination)</text>
            <text x="16" y="108" fill="#334155" font-size="11">• Credits automatically subtract from next bill</text>
        </g>

        <g transform="translate(876, 60)">
            <rect width="400" height="150" fill="#F8FAFC" stroke="#E2E8F0" rx="6"/>
            <text x="16" y="26" fill="#059669" font-weight="700" font-size="12">3. Persistent Stayra Resident ID</text>
            <text x="16" y="48" fill="#334155" font-size="11">• Single persistent ID (STR-RES-XXXXXX)</text>
            <text x="16" y="68" fill="#334155" font-size="11">• Preserves verified KYC and payment reliability</text>
            <text x="16" y="88" fill="#334155" font-size="11">• Data minimization: Past owners have zero</text>
            <text x="16" y="106" fill="#334155" font-size="11">  access to future tenancies or private reviews</text>
        </g>
    </g>
</svg>"""
    return svg

# -------------------------------------------------------------
# DIAGRAM 3: Visual Entity Relationship Architecture (ERD)
# -------------------------------------------------------------
def generate_diagram_3():
    svg = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1400 950" width="100%" height="100%">
{DEFS}
    <!-- Background Canvas -->
    <rect width="1400" height="950" fill="url(#bg-canvas)" rx="16"/>
    <rect x="20" y="20" width="1360" height="910" fill="none" stroke="#E2E8F0" stroke-width="1.5" rx="12"/>

    <!-- Header -->
    <rect x="40" y="40" width="1320" height="60" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1" rx="8" filter="url(#card-shadow)"/>
    <circle cx="70" cy="70" r="16" fill="url(#grad-blue)"/>
    <text x="70" y="75" fill="#FFFFFF" font-weight="800" font-size="14" text-anchor="middle">E</text>
    <text x="100" y="68" fill="#0F172A" font-weight="700" font-size="18">Stayra — Visual Entity Relationship Architecture (ERD)</text>
    <text x="100" y="86" fill="#64748B" font-weight="500" font-size="13">Relational PostgreSQL 16 Schema with PostGIS Coordinates, Double-Entry Ledger, and SLA Engines</text>
    <rect x="1200" y="55" width="140" height="30" fill="#E0F2FE" rx="6"/>
    <text x="1270" y="74" fill="#0284C7" font-weight="600" font-size="12" text-anchor="middle">SCHEMA MODEL</text>

    <!-- TABLE 1: users -->
    <g transform="translate(50, 120)">
        <rect width="250" height="175" fill="#FFFFFF" stroke="#6366F1" stroke-width="1.5" rx="6" filter="url(#card-shadow)"/>
        <rect width="250" height="30" fill="#EEF2FF" rx="6"/>
        <text x="12" y="20" fill="#4F46E5" font-weight="700" font-size="12">users</text>
        <text x="12" y="48" fill="#0F172A" font-size="11">🔑 id: UUID (PK)</text>
        <text x="12" y="68" fill="#334155" font-size="11">• phone_number: VARCHAR(20) [UQ]</text>
        <text x="12" y="88" fill="#334155" font-size="11">• email: VARCHAR(255) [UQ]</text>
        <text x="12" y="108" fill="#334155" font-size="11">• full_name: VARCHAR(150)</text>
        <text x="12" y="128" fill="#334155" font-size="11">• role: user_role_enum</text>
        <text x="12" y="148" fill="#64748B" font-size="10">• is_active: BOOLEAN, created_at</text>
    </g>

    <!-- TABLE 2: resident_profiles -->
    <g transform="translate(50, 325)">
        <rect width="250" height="165" fill="#FFFFFF" stroke="#4F46E5" stroke-width="1.5" rx="6" filter="url(#card-shadow)"/>
        <rect width="250" height="30" fill="#EEF2FF" rx="6"/>
        <text x="12" y="20" fill="#4F46E5" font-weight="700" font-size="12">resident_profiles</text>
        <text x="12" y="48" fill="#0F172A" font-size="11">🔑 id: UUID (PK)</text>
        <text x="12" y="68" fill="#4338CA" font-weight="600" font-size="11">🔗 user_id: UUID (FK)</text>
        <text x="12" y="88" fill="#10B981" font-weight="600" font-size="11">★ stayra_resident_id: VARCHAR [UQ]</text>
        <text x="12" y="108" fill="#334155" font-size="11">• kyc_status: kyc_status_enum</text>
        <text x="12" y="128" fill="#334155" font-size="11">• kyc_document_s3_key: TEXT</text>
        <text x="12" y="148" fill="#64748B" font-size="10">• lifetime_reputation: NUMERIC(3,2)</text>
    </g>

    <!-- TABLE 3: owner_profiles -->
    <g transform="translate(350, 120)">
        <rect width="250" height="175" fill="#FFFFFF" stroke="#059669" stroke-width="1.5" rx="6" filter="url(#card-shadow)"/>
        <rect width="250" height="30" fill="#ECFDF5" rx="6"/>
        <text x="12" y="20" fill="#059669" font-weight="700" font-size="12">owner_profiles</text>
        <text x="12" y="48" fill="#0F172A" font-size="11">🔑 id: UUID (PK)</text>
        <text x="12" y="68" fill="#047857" font-weight="600" font-size="11">🔗 user_id: UUID (FK)</text>
        <text x="12" y="88" fill="#334155" font-size="11">• business_name: VARCHAR(255)</text>
        <text x="12" y="108" fill="#334155" font-size="11">• gstin: VARCHAR(50)</text>
        <text x="12" y="128" fill="#334155" font-size="11">• bank_account_number: VARCHAR</text>
        <text x="12" y="148" fill="#64748B" font-size="10">• payout_verified: BOOLEAN</text>
    </g>

    <!-- TABLE 4: properties -->
    <g transform="translate(650, 120)">
        <rect width="280" height="210" fill="#FFFFFF" stroke="#0284C7" stroke-width="1.5" rx="6" filter="url(#card-shadow)"/>
        <rect width="280" height="30" fill="#E0F2FE" rx="6"/>
        <text x="12" y="20" fill="#0284C7" font-weight="700" font-size="12">properties</text>
        <text x="12" y="48" fill="#0F172A" font-size="11">🔑 id: UUID (PK)</text>
        <text x="12" y="68" fill="#0369A1" font-weight="600" font-size="11">🔗 owner_id: UUID (FK)</text>
        <text x="12" y="88" fill="#334155" font-size="11">• name: VARCHAR(255)</text>
        <text x="12" y="108" fill="#0284C7" font-weight="600" font-size="11">📍 coordinates: GEOGRAPHY(Point)</text>
        <text x="12" y="128" fill="#7C3AED" font-weight="600" font-size="11">🧠 embedding: VECTOR(1536)</text>
        <text x="12" y="148" fill="#334155" font-size="11">• city, state, postal_code</text>
        <text x="12" y="168" fill="#334155" font-size="11">• curfew_time: TIME, notice_days</text>
        <text x="12" y="188" fill="#64748B" font-size="10">• is_verified: BOOLEAN</text>
    </g>

    <!-- TABLE 5: rooms & beds -->
    <g transform="translate(980, 120)">
        <rect width="250" height="150" fill="#FFFFFF" stroke="#0EA5E9" stroke-width="1.5" rx="6" filter="url(#card-shadow)"/>
        <rect width="250" height="30" fill="#F0F9FF" rx="6"/>
        <text x="12" y="20" fill="#0284C7" font-weight="700" font-size="12">rooms</text>
        <text x="12" y="48" fill="#0F172A" font-size="11">🔑 id: UUID (PK)</text>
        <text x="12" y="68" fill="#0284C7" font-weight="600" font-size="11">🔗 property_id: UUID (FK)</text>
        <text x="12" y="88" fill="#334155" font-size="11">• room_number: VARCHAR(50)</text>
        <text x="12" y="108" fill="#334155" font-size="11">• sharing_type: room_sharing_enum</text>
        <text x="12" y="128" fill="#334155" font-size="11">• base_rent_per_bed, deposit</text>
    </g>

    <g transform="translate(980, 295)">
        <rect width="250" height="135" fill="#FFFFFF" stroke="#0EA5E9" stroke-width="1.5" rx="6" filter="url(#card-shadow)"/>
        <rect width="250" height="30" fill="#F0F9FF" rx="6"/>
        <text x="12" y="20" fill="#0284C7" font-weight="700" font-size="12">beds</text>
        <text x="12" y="48" fill="#0F172A" font-size="11">🔑 id: UUID (PK)</text>
        <text x="12" y="68" fill="#0284C7" font-weight="600" font-size="11">🔗 room_id: UUID (FK)</text>
        <text x="12" y="88" fill="#334155" font-size="11">• bed_identifier: VARCHAR(20)</text>
        <text x="12" y="108" fill="#D97706" font-weight="600" font-size="11">• status: VACANT | OCCUPIED</text>
    </g>

    <!-- TABLE 6: tenancies (Central Nexus) -->
    <g transform="translate(350, 360)">
        <rect width="320" height="230" fill="#FFFFFF" stroke="#10B981" stroke-width="2" rx="6" filter="url(#card-shadow)"/>
        <rect width="320" height="32" fill="#D1FAE5" rx="6"/>
        <text x="12" y="22" fill="#047857" font-weight="800" font-size="13">tenancies (Central Agreement)</text>
        <text x="12" y="52" fill="#0F172A" font-size="11">🔑 id: UUID (PK)</text>
        <text x="12" y="72" fill="#4F46E5" font-weight="600" font-size="11">🔗 resident_id: UUID (FK)</text>
        <text x="12" y="92" fill="#0284C7" font-weight="600" font-size="11">🔗 property_id: UUID (FK)</text>
        <text x="12" y="112" fill="#0369A1" font-weight="600" font-size="11">🔗 bed_id: UUID (FK)</text>
        <text x="12" y="132" fill="#10B981" font-weight="700" font-size="11">• status: REQUESTED | ACTIVE | NOTICE</text>
        <text x="12" y="152" fill="#334155" font-size="11">• agreed_rent: NUMERIC(10,2)</text>
        <text x="12" y="172" fill="#334155" font-size="11">• agreed_deposit: NUMERIC(10,2)</text>
        <text x="12" y="192" fill="#334155" font-size="11">• start_date, end_date, actual_move_out</text>
        <text x="12" y="212" fill="#64748B" font-size="10">• agreement_signed_at, agreement_pdf</text>
    </g>

    <!-- TABLE 7: bills & bill_items -->
    <g transform="translate(730, 420)">
        <rect width="250" height="170" fill="#FFFFFF" stroke="#F59E0B" stroke-width="1.5" rx="6" filter="url(#card-shadow)"/>
        <rect width="250" height="30" fill="#FEF3C7" rx="6"/>
        <text x="12" y="20" fill="#B45309" font-weight="700" font-size="12">bills</text>
        <text x="12" y="48" fill="#0F172A" font-size="11">🔑 id: UUID (PK)</text>
        <text x="12" y="68" fill="#059669" font-weight="600" font-size="11">🔗 tenancy_id: UUID (FK)</text>
        <text x="12" y="88" fill="#334155" font-size="11">• subtotal_amount: NUMERIC</text>
        <text x="12" y="108" fill="#DC2626" font-weight="600" font-size="11">• total_service_credits: NUMERIC</text>
        <text x="12" y="128" fill="#059669" font-weight="700" font-size="11">• final_payable_amount: NUMERIC</text>
        <text x="12" y="148" fill="#64748B" font-size="10">• status: DRAFT | ISSUED | PAID</text>
    </g>

    <!-- TABLE 8: ledger_entries (Double Entry) -->
    <g transform="translate(1040, 460)">
        <rect width="280" height="210" fill="#FFFFFF" stroke="#8B5CF6" stroke-width="2" rx="6" filter="url(#card-shadow)"/>
        <rect width="280" height="32" fill="#EDE9FE" rx="6"/>
        <text x="12" y="22" fill="#6D28D9" font-weight="800" font-size="13">ledger_entries (Double-Entry)</text>
        <text x="12" y="52" fill="#0F172A" font-size="11">🔑 id: UUID (PK)</text>
        <text x="12" y="72" fill="#6D28D9" font-weight="600" font-size="11">🔗 debit_account_id: UUID (FK)</text>
        <text x="12" y="92" fill="#6D28D9" font-weight="600" font-size="11">🔗 credit_account_id: UUID (FK)</text>
        <text x="12" y="112" fill="#059669" font-weight="700" font-size="11">💰 amount: NUMERIC(12,2) &gt; 0</text>
        <text x="12" y="132" fill="#D97706" font-weight="600" font-size="11">🔒 idempotency_key: VARCHAR [UQ]</text>
        <text x="12" y="152" fill="#334155" font-size="11">• reference_entity_type: BILL | PYMT</text>
        <text x="12" y="172" fill="#334155" font-size="11">• reference_entity_id: UUID</text>
        <text x="12" y="192" fill="#64748B" font-size="10">• posted_at: TIMESTAMPTZ</text>
    </g>

    <!-- TABLE 9: complaints & SLA Breaches -->
    <g transform="translate(50, 520)">
        <rect width="250" height="195" fill="#FFFFFF" stroke="#F43F5E" stroke-width="1.5" rx="6" filter="url(#card-shadow)"/>
        <rect width="250" height="30" fill="#FFE4E6" rx="6"/>
        <text x="12" y="20" fill="#E11D48" font-weight="700" font-size="12">complaints</text>
        <text x="12" y="48" fill="#0F172A" font-size="11">🔑 id: UUID (PK)</text>
        <text x="12" y="68" fill="#059669" font-weight="600" font-size="11">🔗 tenancy_id: UUID (FK)</text>
        <text x="12" y="88" fill="#0284C7" font-weight="600" font-size="11">🔗 property_id: UUID (FK)</text>
        <text x="12" y="108" fill="#334155" font-size="11">• category: WATER | WIFI | AC ...</text>
        <text x="12" y="128" fill="#DC2626" font-weight="600" font-size="11">• severity: LOW | MED | CRITICAL</text>
        <text x="12" y="148" fill="#334155" font-size="11">• sla_target_time: TIMESTAMPTZ</text>
        <text x="12" y="168" fill="#DC2626" font-weight="700" font-size="11">⚠️ is_sla_breached: BOOLEAN</text>
        <text x="12" y="185" fill="#64748B" font-size="10">• status: OPEN | IN_PROGRESS | RESOLVED</text>
    </g>

    <!-- TABLE 10: service_compensation_credits -->
    <g transform="translate(350, 630)">
        <rect width="320" height="165" fill="#FFFFFF" stroke="#DC2626" stroke-width="2" rx="6" filter="url(#card-shadow)"/>
        <rect width="320" height="30" fill="#FEE2E2" rx="6"/>
        <text x="12" y="20" fill="#B91C1C" font-weight="800" font-size="12">service_compensation_credits</text>
        <text x="12" y="48" fill="#0F172A" font-size="11">🔑 id: UUID (PK)</text>
        <text x="12" y="68" fill="#E11D48" font-weight="600" font-size="11">🔗 complaint_id: UUID (FK) [UQ]</text>
        <text x="12" y="88" fill="#4F46E5" font-weight="600" font-size="11">🔗 resident_id: UUID (FK)</text>
        <text x="12" y="108" fill="#059669" font-weight="700" font-size="11">💵 credit_amount: NUMERIC(10,2)</text>
        <text x="12" y="128" fill="#334155" font-size="11">• breach_duration_hours: NUMERIC</text>
        <text x="12" y="148" fill="#D97706" font-size="11">🔗 applied_to_bill_id: UUID (FK)</text>
    </g>

    <!-- TABLE 11: feedback_reviews & reputation_scores -->
    <g transform="translate(730, 630)">
        <rect width="250" height="165" fill="#FFFFFF" stroke="#059669" stroke-width="1.5" rx="6" filter="url(#card-shadow)"/>
        <rect width="250" height="30" fill="#D1FAE5" rx="6"/>
        <text x="12" y="20" fill="#047857" font-weight="700" font-size="12">feedback_reviews</text>
        <text x="12" y="48" fill="#0F172A" font-size="11">🔑 id: UUID (PK)</text>
        <text x="12" y="68" fill="#059669" font-weight="600" font-size="11">🔗 tenancy_id: UUID (FK)</text>
        <text x="12" y="88" fill="#334155" font-size="11">• cleanliness, food, wifi, speed</text>
        <text x="12" y="108" fill="#059669" font-weight="700" font-size="11">⭐ overall_rating: NUMERIC(2,1)</text>
        <text x="12" y="128" fill="#334155" font-size="11">• review_text: TEXT</text>
        <text x="12" y="148" fill="#64748B" font-size="10">• verified_tenant_only: TRUE</text>
    </g>

    <!-- TABLE 12: ai_audit_logs -->
    <g transform="translate(1040, 710)">
        <rect width="280" height="155" fill="#FFFFFF" stroke="#4F46E5" stroke-width="1.5" rx="6" filter="url(#card-shadow)"/>
        <rect width="280" height="30" fill="#EEF2FF" rx="6"/>
        <text x="12" y="20" fill="#4F46E5" font-weight="700" font-size="12">ai_audit_logs (Immutable Safety)</text>
        <text x="12" y="48" fill="#0F172A" font-size="11">🔑 id: UUID (PK)</text>
        <text x="12" y="68" fill="#334155" font-size="11">• agent_type: RECOMMEND | COMPLAINT</text>
        <text x="12" y="88" fill="#334155" font-size="11">• tool_name, tool_arguments: JSONB</text>
        <text x="12" y="108" fill="#059669" font-weight="600" font-size="11">• zero_direct_db_write_enforced: TRUE</text>
        <text x="12" y="128" fill="#334155" font-size="11">• prompt_tokens, latency_ms, cost_usd</text>
    </g>

    <!-- TABLE 13: staff_profiles (Property Maintenance) -->
    <g transform="translate(50, 745)">
        <rect width="250" height="165" fill="#FFFFFF" stroke="#0284C7" stroke-width="1.5" rx="6" filter="url(#card-shadow)"/>
        <rect width="250" height="30" fill="#E0F2FE" rx="6"/>
        <text x="12" y="20" fill="#0369A1" font-weight="700" font-size="12">staff_profiles</text>
        <text x="12" y="48" fill="#0F172A" font-size="11">🔑 id: UUID (PK)</text>
        <text x="12" y="68" fill="#4F46E5" font-weight="600" font-size="11">🔗 user_id: UUID (FK)</text>
        <text x="12" y="88" fill="#0284C7" font-weight="600" font-size="11">🔗 assigned_property_id: UUID (FK)</text>
        <text x="12" y="108" fill="#334155" font-size="11">• job_title: Electrician, Plumber</text>
        <text x="12" y="128" fill="#059669" font-weight="600" font-size="11">• can_resolve_tickets: TRUE</text>
        <text x="12" y="148" fill="#64748B" font-size="10">• created_at: TIMESTAMPTZ</text>
    </g>

    <!-- ========================================== -->
    <!-- Foreign Key Relationship Connectors & Badges -->
    <!-- ========================================== -->

    <!-- 1. users -> resident_profiles (1:1) -->
    <path d="M 175 295 L 175 325" stroke="#4F46E5" stroke-width="2" marker-end="url(#arrow-indigo)"/>
    <g transform="translate(175, 310)">
        <rect x="-18" y="-8" width="36" height="16" fill="#FFFFFF" stroke="#4F46E5" stroke-width="1" rx="4"/>
        <text y="3.5" font-size="9" fill="#4F46E5" font-weight="700" text-anchor="middle">1 : 1</text>
    </g>

    <!-- 2. users -> owner_profiles (1:1) -->
    <path d="M 300 207 L 350 207" stroke="#059669" stroke-width="2" marker-end="url(#arrow-emerald)"/>
    <g transform="translate(325, 207)">
        <rect x="-18" y="-8" width="36" height="16" fill="#FFFFFF" stroke="#059669" stroke-width="1" rx="4"/>
        <text y="3.5" font-size="9" fill="#059669" font-weight="700" text-anchor="middle">1 : 1</text>
    </g>

    <!-- 3. owner_profiles -> properties (1:N) -->
    <path d="M 600 207 L 650 207" stroke="#0284C7" stroke-width="2" marker-end="url(#arrow-blue)"/>
    <g transform="translate(625, 207)">
        <rect x="-18" y="-8" width="36" height="16" fill="#FFFFFF" stroke="#0284C7" stroke-width="1" rx="4"/>
        <text y="3.5" font-size="9" fill="#0284C7" font-weight="700" text-anchor="middle">1 : N</text>
    </g>

    <!-- 4. properties -> rooms (1:N) -->
    <path d="M 930 195 L 980 195" stroke="#0284C7" stroke-width="2" marker-end="url(#arrow-blue)"/>
    <g transform="translate(955, 195)">
        <rect x="-18" y="-8" width="36" height="16" fill="#FFFFFF" stroke="#0284C7" stroke-width="1" rx="4"/>
        <text y="3.5" font-size="9" fill="#0284C7" font-weight="700" text-anchor="middle">1 : N</text>
    </g>

    <!-- 5. rooms -> beds (1:N) -->
    <path d="M 1105 270 L 1105 295" stroke="#0284C7" stroke-width="2" marker-end="url(#arrow-blue)"/>
    <g transform="translate(1105, 282.5)">
        <rect x="-18" y="-8" width="36" height="16" fill="#FFFFFF" stroke="#0284C7" stroke-width="1" rx="4"/>
        <text y="3.5" font-size="9" fill="#0284C7" font-weight="700" text-anchor="middle">1 : N</text>
    </g>

    <!-- 6. resident_profiles -> tenancies (1:N) -->
    <path d="M 300 410 L 350 410" stroke="#4F46E5" stroke-width="2" marker-end="url(#arrow-indigo)"/>
    <g transform="translate(325, 410)">
        <rect x="-18" y="-8" width="36" height="16" fill="#FFFFFF" stroke="#4F46E5" stroke-width="1" rx="4"/>
        <text y="3.5" font-size="9" fill="#4F46E5" font-weight="700" text-anchor="middle">1 : N</text>
    </g>

    <!-- 7. properties -> tenancies (1:N) -->
    <path d="M 680 330 C 680 348, 580 342, 580 360" stroke="#0284C7" stroke-width="2" fill="none" marker-end="url(#arrow-blue)"/>
    <g transform="translate(635, 345)">
        <rect x="-18" y="-8" width="36" height="16" fill="#FFFFFF" stroke="#0284C7" stroke-width="1" rx="4"/>
        <text y="3.5" font-size="9" fill="#0284C7" font-weight="700" text-anchor="middle">1 : N</text>
    </g>

    <!-- 8. beds -> tenancies (1:N) -->
    <path d="M 980 365 C 860 365, 750 395, 670 395" stroke="#0284C7" stroke-width="2" fill="none" marker-end="url(#arrow-blue)"/>
    <g transform="translate(830, 368)">
        <rect x="-24" y="-8" width="48" height="16" fill="#FFFFFF" stroke="#0284C7" stroke-width="1" rx="4"/>
        <text y="3.5" font-size="9" fill="#0284C7" font-weight="700" text-anchor="middle">1 : N (bed)</text>
    </g>

    <!-- 9. tenancies -> bills (1:N) -->
    <path d="M 670 480 L 730 480" stroke="#F59E0B" stroke-width="2" marker-end="url(#arrow-amber)"/>
    <g transform="translate(700, 480)">
        <rect x="-18" y="-8" width="36" height="16" fill="#FFFFFF" stroke="#F59E0B" stroke-width="1" rx="4"/>
        <text y="3.5" font-size="9" fill="#B45309" font-weight="700" text-anchor="middle">1 : N</text>
    </g>

    <!-- 10. bills -> ledger_entries (1:N) -->
    <path d="M 980 505 L 1040 505" stroke="#8B5CF6" stroke-width="2" marker-end="url(#arrow-indigo)"/>
    <g transform="translate(1010, 505)">
        <rect x="-18" y="-8" width="36" height="16" fill="#FFFFFF" stroke="#8B5CF6" stroke-width="1" rx="4"/>
        <text y="3.5" font-size="9" fill="#6D28D9" font-weight="700" text-anchor="middle">1 : N</text>
    </g>

    <!-- 11. tenancies -> complaints (1:N) -->
    <path d="M 350 550 L 300 550" stroke="#F43F5E" stroke-width="2" marker-end="url(#arrow-rose)"/>
    <g transform="translate(325, 550)">
        <rect x="-18" y="-8" width="36" height="16" fill="#FFFFFF" stroke="#F43F5E" stroke-width="1" rx="4"/>
        <text y="3.5" font-size="9" fill="#E11D48" font-weight="700" text-anchor="middle">1 : N</text>
    </g>

    <!-- 12. complaints -> service_compensation_credits (1:1) -->
    <path d="M 300 680 L 350 680" stroke="#DC2626" stroke-width="2" marker-end="url(#arrow-rose)"/>
    <g transform="translate(325, 680)">
        <rect x="-18" y="-8" width="36" height="16" fill="#FFFFFF" stroke="#DC2626" stroke-width="1" rx="4"/>
        <text y="3.5" font-size="9" fill="#B91C1C" font-weight="700" text-anchor="middle">1 : 1</text>
    </g>

    <!-- 13. service_compensation_credits -> bills (Credit Offset) -->
    <path d="M 670 710 C 720 710, 780 650, 780 590" stroke="#DC2626" stroke-width="2" stroke-dasharray="4,4" fill="none" marker-end="url(#arrow-rose)"/>
    <g transform="translate(740, 645)">
        <rect x="-35" y="-8" width="70" height="16" fill="#FFFFFF" stroke="#DC2626" stroke-width="1" rx="4"/>
        <text y="3.5" font-size="9" fill="#B91C1C" font-weight="700" text-anchor="middle">Credit Offset</text>
    </g>

    <!-- 14. tenancies -> feedback_reviews (1:N) -->
    <path d="M 670 570 C 700 570, 700 680, 730 680" stroke="#059669" stroke-width="2" fill="none" marker-end="url(#arrow-emerald)"/>
    <g transform="translate(700, 625)">
        <rect x="-18" y="-8" width="36" height="16" fill="#FFFFFF" stroke="#059669" stroke-width="1" rx="4"/>
        <text y="3.5" font-size="9" fill="#047857" font-weight="700" text-anchor="middle">1 : N</text>
    </g>

    <!-- 15. staff_profiles -> complaints (1:N ticket assignment) -->
    <path d="M 175 745 L 175 715" stroke="#0284C7" stroke-width="2" marker-end="url(#arrow-blue)"/>
    <g transform="translate(175, 730)">
        <rect x="-28" y="-8" width="56" height="16" fill="#FFFFFF" stroke="#0284C7" stroke-width="1" rx="4"/>
        <text y="3.5" font-size="9" fill="#0284C7" font-weight="700" text-anchor="middle">1:N (assign)</text>
    </g>
</svg>"""
    return svg

# -------------------------------------------------------------
# DIAGRAM 4: Double-Entry Financial Ledger & Rent Flow
# -------------------------------------------------------------
def generate_diagram_4():
    svg = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1400 900" width="100%" height="100%">
{DEFS}
    <!-- Background Canvas -->
    <rect width="1400" height="900" fill="url(#bg-canvas)" rx="16"/>
    <rect x="20" y="20" width="1360" height="860" fill="none" stroke="#E2E8F0" stroke-width="1.5" rx="12"/>

    <!-- Header -->
    <rect x="40" y="40" width="1320" height="60" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1" rx="8" filter="url(#card-shadow)"/>
    <circle cx="70" cy="70" r="16" fill="url(#grad-amber)"/>
    <text x="70" y="75" fill="#FFFFFF" font-weight="800" font-size="14" text-anchor="middle">$</text>
    <text x="100" y="68" fill="#0F172A" font-weight="700" font-size="18">Stayra — Double-Entry Financial Ledger &amp; Rent Automation Architecture</text>
    <text x="100" y="86" fill="#64748B" font-weight="500" font-size="13">Deterministic Rent Calculation, SLA Credit Offset, and Razorpay Webhook Reconciliation</text>
    <rect x="1200" y="55" width="140" height="30" fill="#FEF3C7" rx="6"/>
    <text x="1270" y="74" fill="#D97706" font-weight="600" font-size="12" text-anchor="middle">FINANCIAL CORE</text>

    <!-- SECTION A: Monthly Bill Calculation Pipeline -->
    <g transform="translate(50, 125)">
        <rect width="620" height="350" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1.5" rx="10" filter="url(#card-shadow)"/>
        <path d="M 0 10 Q 0 0 10 0 L 610 0 Q 620 0 620 10 L 620 38 L 0 38 Z" fill="#F8FAFC"/>
        <text x="20" y="25" fill="#0F172A" font-weight="700" font-size="14">Monthly Bill Calculation Pipeline (Deterministic Logic)</text>

        <!-- Step 1: Base Rent -->
        <rect x="20" y="55" width="580" height="50" fill="#F8FAFC" stroke="#E2E8F0" rx="6"/>
        <text x="36" y="76" fill="#0F172A" font-weight="600" font-size="12">1. Base Rent (Agreed Tenancy Rate)</text>
        <text x="36" y="94" fill="#64748B" font-size="11">Loaded from tenancies.agreed_rent (e.g., ₹12,000 / month)</text>
        <text x="580" y="85" fill="#0F172A" font-weight="700" font-size="14" text-anchor="end">+₹12,000</text>

        <!-- Step 2: Variable Utilities -->
        <rect x="20" y="115" width="580" height="50" fill="#F8FAFC" stroke="#E2E8F0" rx="6"/>
        <text x="36" y="136" fill="#0F172A" font-weight="600" font-size="12">2. Metered Utility Charges (Electricity)</text>
        <text x="36" y="154" fill="#64748B" font-size="11">Units: (Current Reading - Previous Reading) × ₹10/unit = 120 units</text>
        <text x="580" y="145" fill="#0F172A" font-weight="700" font-size="14" text-anchor="end">+₹1,200</text>

        <!-- Step 3: Fixed Food & Amenities -->
        <rect x="20" y="175" width="580" height="50" fill="#F8FAFC" stroke="#E2E8F0" rx="6"/>
        <text x="36" y="196" fill="#0F172A" font-weight="600" font-size="12">3. Food Mess &amp; Maintenance Package</text>
        <text x="36" y="214" fill="#64748B" font-size="11">Fixed monthly subscription charges configured on property</text>
        <text x="580" y="205" fill="#0F172A" font-weight="700" font-size="14" text-anchor="end">+₹2,500</text>

        <!-- Step 4: SLA Credit Deduction -->
        <rect x="20" y="235" width="580" height="55" fill="#FEF2F2" stroke="#FCA5A5" rx="6"/>
        <text x="36" y="256" fill="#B91C1C" font-weight="700" font-size="12">4. Service Compensation Credit Offset (Flagship Feature)</text>
        <text x="36" y="274" fill="#991B1B" font-size="11">WiFi Outage SLA breach credit (Ticket #392, 3 days breach)</text>
        <text x="580" y="265" fill="#DC2626" font-weight="800" font-size="15" text-anchor="end">-₹300</text>

        <!-- Total Calculation Result -->
        <rect x="20" y="300" width="580" height="40" fill="#ECFDF5" stroke="#6EE7B7" rx="6"/>
        <text x="36" y="325" fill="#047857" font-weight="800" font-size="13">NET FINAL PAYABLE FOR INVOICE</text>
        <text x="580" y="326" fill="#047857" font-weight="800" font-size="16" text-anchor="end">₹15,400</text>
    </g>

    <!-- SECTION B: Double-Entry Ledger Book -->
    <g transform="translate(710, 125)">
        <rect width="640" height="350" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1.5" rx="10" filter="url(#card-shadow)"/>
        <path d="M 0 10 Q 0 0 10 0 L 630 0 Q 640 0 640 10 L 640 38 L 0 38 Z" fill="#F8FAFC"/>
        <text x="20" y="25" fill="#0F172A" font-weight="700" font-size="14">Double-Entry Journal Postings (Zero-Sum Principle)</text>

        <!-- Ledger Entry 1: Invoice Generation -->
        <rect x="20" y="55" width="600" height="80" fill="#F8FAFC" stroke="#E2E8F0" rx="6"/>
        <text x="32" y="74" fill="#4F46E5" font-weight="700" font-size="12">EVENT: MONTHLY INVOICE GENERATED (Inv #STR-2026-001)</text>
        <text x="32" y="94" fill="#0F172A" font-size="11"><tspan font-weight="600">DEBIT:</tspan> RECEIVABLE_RESIDENT (Resident owes Stayra/Owner)</text>
        <text x="500" y="94" fill="#0F172A" font-weight="700" font-size="12" text-anchor="end">₹15,700 Dr</text>
        <text x="32" y="114" fill="#64748B" font-size="11"><tspan font-weight="600">CREDIT:</tspan> REVENUE_RENT (₹12,000) + REVENUE_UTILITIES (₹3,700)</text>
        <text x="500" y="114" fill="#64748B" font-weight="700" font-size="12" text-anchor="end">₹15,700 Cr</text>

        <!-- Ledger Entry 2: SLA Credit Application -->
        <rect x="20" y="145" width="600" height="80" fill="#F8FAFC" stroke="#E2E8F0" rx="6"/>
        <text x="32" y="164" fill="#DC2626" font-weight="700" font-size="12">EVENT: SLA COMPENSATION APPLIED (Credit Ref #COMP-392)</text>
        <text x="32" y="184" fill="#0F172A" font-size="11"><tspan font-weight="600">DEBIT:</tspan> EXPENSE_SERVICE_COMPENSATION (Owner liability expense)</text>
        <text x="500" y="184" fill="#DC2626" font-weight="700" font-size="12" text-anchor="end">₹300 Dr</text>
        <text x="32" y="204" fill="#64748B" font-size="11"><tspan font-weight="600">CREDIT:</tspan> RECEIVABLE_RESIDENT (Reduces tenant receivable)</text>
        <text x="500" y="204" fill="#059669" font-weight="700" font-size="12" text-anchor="end">₹300 Cr</text>

        <!-- Ledger Entry 3: Payment Settled -->
        <rect x="20" y="235" width="600" height="95" fill="#F8FAFC" stroke="#E2E8F0" rx="6"/>
        <text x="32" y="254" fill="#059669" font-weight="700" font-size="12">EVENT: PAYMENT SETTLED VIA RAZORPAY (Txn #pay_92019a)</text>
        <text x="32" y="274" fill="#0F172A" font-size="11"><tspan font-weight="600">DEBIT:</tspan> ASSET_ESCROW (Bank account receives funds from gateway)</text>
        <text x="500" y="274" fill="#047857" font-weight="700" font-size="12" text-anchor="end">₹15,400 Dr</text>
        <text x="32" y="294" fill="#64748B" font-size="11"><tspan font-weight="600">CREDIT:</tspan> RECEIVABLE_RESIDENT (Tenant receivable cleared to 0)</text>
        <text x="500" y="294" fill="#047857" font-weight="700" font-size="12" text-anchor="end">₹15,400 Cr</text>
        <text x="32" y="316" fill="#10B981" font-weight="700" font-size="11">✓ NET RESIDENT BALANCE: ₹0.00 (Zero Outstanding Balance)</text>
    </g>

    <!-- SECTION C: Payment Gateway Webhook Sequence -->
    <g transform="translate(50, 505)">
        <rect width="1300" height="360" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1.5" rx="10" filter="url(#card-shadow)"/>
        <path d="M 0 10 Q 0 0 10 0 L 1290 0 Q 1300 0 1300 10 L 1300 40 L 0 40 Z" fill="#F8FAFC"/>
        <text x="24" y="26" fill="#0F172A" font-weight="700" font-size="14">IDEMPOTENT PAYMENT GATEWAY WEBHOOK ARCHITECTURE</text>

        <!-- Column 1: Client App -->
        <rect x="30" y="60" width="220" height="280" fill="#F8FAFC" stroke="#E2E8F0" rx="8"/>
        <rect x="30" y="60" width="220" height="35" fill="#EEF2FF" rx="8"/>
        <text x="140" y="82" fill="#4F46E5" font-weight="700" font-size="12" text-anchor="middle">React Native Client</text>
        <text x="44" y="120" fill="#334155" font-size="11">1. User taps "Pay Rent"</text>
        <text x="44" y="150" fill="#334155" font-size="11">2. POST /payments/order</text>
        <text x="44" y="180" fill="#334155" font-size="11">3. Razorpay SDK opens</text>
        <text x="44" y="210" fill="#334155" font-size="11">4. Resident pays via UPI</text>
        <text x="44" y="250" fill="#DC2626" font-weight="600" font-size="10">⚠️ Never trust client</text>
        <text x="44" y="266" fill="#DC2626" font-size="10">success callback alone</text>
        <text x="44" y="282" fill="#64748B" font-size="10">Wait for backend webhook</text>

        <!-- Column 2: Razorpay Gateway -->
        <rect x="290" y="60" width="220" height="280" fill="#F8FAFC" stroke="#E2E8F0" rx="8"/>
        <rect x="290" y="60" width="220" height="35" fill="#E0F2FE" rx="8"/>
        <text x="400" y="82" fill="#0284C7" font-weight="700" font-size="12" text-anchor="middle">Razorpay Gateway</text>
        <text x="304" y="120" fill="#334155" font-size="11">1. Processes Bank / UPI</text>
        <text x="304" y="150" fill="#334155" font-size="11">2. Captures payment</text>
        <text x="304" y="180" fill="#334155" font-size="11">3. Signs payload using</text>
        <text x="304" y="196" fill="#0284C7" font-weight="600" font-size="10">HMAC-SHA256 secret</text>
        <text x="304" y="230" fill="#334155" font-size="11">4. Dispatches webhook to</text>
        <text x="304" y="246" fill="#334155" font-size="10">/api/v1/payments/webhook</text>
        <text x="304" y="280" fill="#059669" font-weight="600" font-size="11">Retries on 5xx failure</text>

        <!-- Column 3: Backend Ingress & Signature -->
        <rect x="550" y="60" width="230" height="280" fill="#F8FAFC" stroke="#E2E8F0" rx="8"/>
        <rect x="550" y="60" width="230" height="35" fill="#FEF3C7" rx="8"/>
        <text x="665" y="82" fill="#B45309" font-weight="700" font-size="12" text-anchor="middle">Security &amp; Signature</text>
        <text x="564" y="120" fill="#334155" font-size="11">1. Read raw body payload</text>
        <text x="564" y="150" fill="#334155" font-size="11">2. Verify X-Razorpay-Sig</text>
        <text x="564" y="170" fill="#DC2626" font-weight="600" font-size="10">Invalid? Return 400 Bad</text>
        <text x="564" y="200" fill="#334155" font-size="11">3. Check idempotency key</text>
        <text x="564" y="216" fill="#64748B" font-size="10">in Redis: SETNX(txn_id)</text>
        <text x="564" y="246" fill="#059669" font-weight="600" font-size="11">Already processed?</text>
        <text x="564" y="262" fill="#059669" font-size="10">Return 200 OK immediately</text>

        <!-- Column 4: Ledger & DB Execution -->
        <rect x="820" y="60" width="230" height="280" fill="#F8FAFC" stroke="#E2E8F0" rx="8"/>
        <rect x="820" y="60" width="230" height="35" fill="#ECFDF5" rx="8"/>
        <text x="935" y="82" fill="#047857" font-weight="700" font-size="12" text-anchor="middle">Database Atomic Txn</text>
        <text x="834" y="120" fill="#334155" font-size="11">1. Begin SQL Transaction</text>
        <text x="834" y="145" fill="#334155" font-size="11">2. Lock bill row with</text>
        <text x="834" y="160" fill="#047857" font-weight="600" font-size="10">SELECT ... FOR UPDATE</text>
        <text x="834" y="185" fill="#334155" font-size="11">3. Post double-entry records</text>
        <text x="834" y="210" fill="#334155" font-size="11">4. Set bill.status = 'PAID'</text>
        <text x="834" y="235" fill="#334155" font-size="11">5. Commit Transaction</text>
        <text x="834" y="265" fill="#059669" font-weight="700" font-size="11">✓ Zero Balance Achieved</text>

        <!-- Column 5: Notifications & Receipt -->
        <rect x="1080" y="60" width="200" height="280" fill="#F8FAFC" stroke="#E2E8F0" rx="8"/>
        <rect x="1080" y="60" width="200" height="35" fill="#F3E8FF" rx="8"/>
        <text x="1180" y="82" fill="#7E22CE" font-weight="700" font-size="12" text-anchor="middle">Receipt &amp; Alerts</text>
        <text x="1094" y="120" fill="#334155" font-size="11">1. Generate PDF receipt</text>
        <text x="1094" y="150" fill="#334155" font-size="11">2. Upload receipt to S3</text>
        <text x="1094" y="180" fill="#334155" font-size="11">3. Push notification to</text>
        <text x="1094" y="196" fill="#64748B" font-size="10">Resident &amp; Owner</text>
        <text x="1094" y="226" fill="#334155" font-size="11">4. WhatsApp confirmation</text>
        <text x="1094" y="256" fill="#7E22CE" font-weight="600" font-size="11">5. Update Owner Metrics</text>
    </g>
</svg>"""
    return svg

# -------------------------------------------------------------
# DIAGRAM 5: SLA Breach & Deterministic Compensation Flow
# -------------------------------------------------------------
def generate_diagram_5():
    svg = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1400 900" width="100%" height="100%">
{DEFS}
    <!-- Background Canvas -->
    <rect width="1400" height="900" fill="url(#bg-canvas)" rx="16"/>
    <rect x="20" y="20" width="1360" height="860" fill="none" stroke="#E2E8F0" stroke-width="1.5" rx="12"/>

    <!-- Header -->
    <rect x="40" y="40" width="1320" height="60" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1" rx="8" filter="url(#card-shadow)"/>
    <circle cx="70" cy="70" r="16" fill="url(#grad-rose)"/>
    <text x="70" y="75" fill="#FFFFFF" font-weight="800" font-size="14" text-anchor="middle">⏱</text>
    <text x="100" y="68" fill="#0F172A" font-weight="700" font-size="18">Stayra — SLA Breach Monitoring &amp; Deterministic Rent Compensation</text>
    <text x="100" y="86" fill="#64748B" font-weight="500" font-size="13">Automated Escalation, BullMQ Heartbeat, and Service-Level-Based Ledger Credits</text>
    <rect x="1190" y="55" width="150" height="30" fill="#FFE4E6" rx="6"/>
    <text x="1265" y="74" fill="#E11D48" font-weight="600" font-size="12" text-anchor="middle">SLA ENGINE</text>

    <!-- Top Lifecycle State Machine Flow -->
    <g transform="translate(50, 125)">
        <rect width="1300" height="150" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1.5" rx="10" filter="url(#card-shadow)"/>
        <path d="M 0 10 Q 0 0 10 0 L 1290 0 Q 1300 0 1300 10 L 1300 35 L 0 35 Z" fill="#F8FAFC"/>
        <text x="20" y="24" fill="#0F172A" font-weight="700" font-size="13">COMPLAINT TICKET LIFECYCLE &amp; ESCALATION TIMELINE</text>

        <!-- Node 1: Ticket Raised -->
        <rect x="30" y="55" width="190" height="75" fill="#EEF2FF" stroke="#6366F1" stroke-width="1.5" rx="6"/>
        <text x="45" y="80" fill="#4F46E5" font-weight="700" font-size="12">1. Ticket Raised</text>
        <text x="45" y="98" fill="#334155" font-size="10">WiFi Down (24h SLA)</text>
        <text x="45" y="114" fill="#64748B" font-size="9">Timestamp: Day 1, 10:00 AM</text>

        <path d="M 220 92 L 255 92" stroke="#6366F1" stroke-width="2" marker-end="url(#arrow-indigo)"/>

        <!-- Node 2: 50% Warning -->
        <rect x="260" y="55" width="190" height="75" fill="#FEF3C7" stroke="#F59E0B" stroke-width="1.5" rx="6"/>
        <text x="275" y="80" fill="#D97706" font-weight="700" font-size="12">2. 50% SLA Elapsed</text>
        <text x="275" y="98" fill="#334155" font-size="10">12 Hours Remaining</text>
        <text x="275" y="114" fill="#64748B" font-size="9">Push reminder to assigned staff</text>

        <path d="M 450 92 L 485 92" stroke="#F59E0B" stroke-width="2" marker-end="url(#arrow-amber)"/>

        <!-- Node 3: 80% Urgent Escalation -->
        <rect x="490" y="55" width="190" height="75" fill="#FFEDD5" stroke="#EA580C" stroke-width="1.5" rx="6"/>
        <text x="505" y="80" fill="#C2410C" font-weight="700" font-size="12">3. 80% SLA Elapsed</text>
        <text x="505" y="98" fill="#334155" font-size="10">Urgent Owner Alert</text>
        <text x="505" y="114" fill="#64748B" font-size="9">Breach imminent in 4.8 hours</text>

        <path d="M 680 92 L 715 92" stroke="#EA580C" stroke-width="2" marker-end="url(#arrow-rose)"/>

        <!-- Node 4: SLA Breached -->
        <rect x="720" y="55" width="220" height="75" fill="#FEE2E2" stroke="#DC2626" stroke-width="2" rx="6"/>
        <text x="735" y="80" fill="#B91C1C" font-weight="800" font-size="12">4. SLA BREACH TRIGGERED</text>
        <text x="735" y="98" fill="#334155" font-size="10">Target time passed (&gt;24h)</text>
        <text x="735" y="114" fill="#DC2626" font-weight="600" font-size="9">Compensation Evaluator Awakens</text>

        <path d="M 940 92 L 985 92" stroke="#DC2626" stroke-width="2" marker-end="url(#arrow-rose)"/>

        <!-- Node 5: Credit Issued & Settlement -->
        <rect x="990" y="55" width="280" height="75" fill="#ECFDF5" stroke="#10B981" stroke-width="1.5" rx="6"/>
        <text x="1005" y="80" fill="#047857" font-weight="800" font-size="12">5. Service Credit Issued &amp; Closed</text>
        <text x="1005" y="98" fill="#334155" font-size="10">₹100/day credited to pending ledger</text>
        <text x="1005" y="114" fill="#059669" font-size="9">Resident verified fix; rating collected</text>
    </g>

    <!-- SECTION 2: BullMQ Heartbeat & Deterministic Compensation Flow -->
    <g transform="translate(50, 305)">
        <rect width="630" height="555" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1.5" rx="10" filter="url(#card-shadow)"/>
        <path d="M 0 10 Q 0 0 10 0 L 620 0 Q 630 0 630 10 L 630 38 L 0 38 Z" fill="#F8FAFC"/>
        <text x="20" y="25" fill="#0F172A" font-weight="700" font-size="14">BullMQ 15-Minute Heartbeat Worker Architecture</text>

        <g transform="translate(20, 55)">
            <!-- Worker Loop 1 -->
            <rect width="590" height="75" fill="#F8FAFC" stroke="#E2E8F0" rx="6"/>
            <text x="20" y="28" fill="#4F46E5" font-weight="700" font-size="12">Step 1: BullMQ Recurring Job Fires (Every 15 mins)</text>
            <text x="20" y="48" fill="#334155" font-size="11">Worker queries complaints WHERE status NOT IN ('RESOLVED', 'CLOSED')</text>
            <text x="20" y="64" fill="#64748B" font-size="10">Batches up to 500 tickets with Redis distributed mutex lock to prevent duplicates</text>
        </g>

        <g transform="translate(20, 145)">
            <!-- Worker Loop 2 -->
            <rect width="590" height="75" fill="#F8FAFC" stroke="#E2E8F0" rx="6"/>
            <text x="20" y="28" fill="#D97706" font-weight="700" font-size="12">Step 2: Check target_time vs NOW()</text>
            <text x="20" y="48" fill="#334155" font-size="11">If NOW() &gt; sla_target_time AND is_sla_breached == FALSE:</text>
            <text x="20" y="64" fill="#DC2626" font-weight="600" font-size="10">Flip is_sla_breached = TRUE; Emit TicketSlaBreachedEvent</text>
        </g>

        <g transform="translate(20, 235)">
            <!-- Worker Loop 3 -->
            <rect width="590" height="110" fill="#F8FAFC" stroke="#E2E8F0" rx="6"/>
            <text x="20" y="28" fill="#DC2626" font-weight="700" font-size="12">Step 3: Execute Pure TypeScript Math Engine</text>
            <text x="20" y="48" fill="#334155" font-size="11">const breachHours = (now - createdAt) / (1000 * 3600) - slaHours;</text>
            <text x="20" y="66" fill="#334155" font-size="11">const breachDays = Math.ceil(breachHours / 24);</text>
            <text x="20" y="84" fill="#047857" font-weight="600" font-size="11">const credit = Math.min(breachDays * policyRate, policyMaxCap);</text>
            <text x="20" y="100" fill="#64748B" font-size="10">Pure deterministic execution without any external LLM calls</text>
        </g>

        <g transform="translate(20, 360)">
            <!-- Worker Loop 4 -->
            <rect width="590" height="85" fill="#F8FAFC" stroke="#E2E8F0" rx="6"/>
            <text x="20" y="28" fill="#059669" font-weight="700" font-size="12">Step 4: Atomic Ledger Credit Record</text>
            <text x="20" y="48" fill="#334155" font-size="11">Insert into service_compensation_credits (status: 'PENDING')</text>
            <text x="20" y="68" fill="#334155" font-size="11">Tag complaint_id to prevent double evaluation on next heartbeat cycle</text>
        </g>

        <g transform="translate(20, 460)">
            <!-- Worker Loop 5 -->
            <rect width="590" height="75" fill="#ECFDF5" stroke="#6EE7B7" rx="6"/>
            <text x="20" y="28" fill="#047857" font-weight="800" font-size="12">Step 5: Automated Resident &amp; Owner Notifications</text>
            <text x="20" y="48" fill="#065F46" font-size="11">Resident receives: "SLA breached for WiFi ticket. ₹100 credit added."</text>
            <text x="20" y="64" fill="#065F46" font-size="10">Owner alerted with escalation report &amp; penalty audit note</text>
        </g>
    </g>

    <!-- SECTION 3: Configurable Property SLA Matrix Table -->
    <g transform="translate(710, 305)">
        <rect width="640" height="555" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1.5" rx="10" filter="url(#card-shadow)"/>
        <path d="M 0 10 Q 0 0 10 0 L 630 0 Q 640 0 640 10 L 640 38 L 0 38 Z" fill="#F8FAFC"/>
        <text x="20" y="25" fill="#0F172A" font-weight="700" font-size="14">Configurable Property SLA &amp; Compensation Matrix</text>

        <!-- Table Header -->
        <rect x="20" y="55" width="600" height="35" fill="#EEF2FF" rx="4"/>
        <text x="35" y="77" fill="#4F46E5" font-weight="700" font-size="11">CATEGORY</text>
        <text x="175" y="77" fill="#4F46E5" font-weight="700" font-size="11">SEVERITY</text>
        <text x="270" y="77" fill="#4F46E5" font-weight="700" font-size="11">SLA HOURS</text>
        <text x="375" y="77" fill="#4F46E5" font-weight="700" font-size="11">COMPENSATION</text>
        <text x="520" y="77" fill="#4F46E5" font-weight="700" font-size="11">MAX CAP</text>

        <!-- Row 1: Power Outage -->
        <rect x="20" y="98" width="600" height="42" fill="#F8FAFC" stroke="#E2E8F0" rx="4"/>
        <text x="35" y="124" fill="#0F172A" font-weight="600" font-size="11">⚡ Power / MCB</text>
        <text x="175" y="124" fill="#DC2626" font-weight="700" font-size="10">CRITICAL</text>
        <text x="270" y="124" fill="#0F172A" font-size="11">4 Hours</text>
        <text x="375" y="124" fill="#059669" font-weight="600" font-size="11">₹250 / day</text>
        <text x="520" y="124" fill="#64748B" font-size="11">₹1,500</text>

        <!-- Row 2: Water Outage -->
        <rect x="20" y="148" width="600" height="42" fill="#FFFFFF" stroke="#E2E8F0" rx="4"/>
        <text x="35" y="174" fill="#0F172A" font-weight="600" font-size="11">🚰 Water Supply</text>
        <text x="175" y="174" fill="#DC2626" font-weight="700" font-size="10">CRITICAL</text>
        <text x="270" y="174" fill="#0F172A" font-size="11">4 Hours</text>
        <text x="375" y="174" fill="#059669" font-weight="600" font-size="11">₹300 / day</text>
        <text x="520" y="174" fill="#64748B" font-size="11">₹2,000</text>

        <!-- Row 3: WiFi / Internet -->
        <rect x="20" y="198" width="600" height="42" fill="#F8FAFC" stroke="#E2E8F0" rx="4"/>
        <text x="35" y="224" fill="#0F172A" font-weight="600" font-size="11">📶 WiFi / Internet</text>
        <text x="175" y="224" fill="#D97706" font-weight="700" font-size="10">MEDIUM</text>
        <text x="270" y="224" fill="#0F172A" font-size="11">24 Hours</text>
        <text x="375" y="224" fill="#059669" font-weight="600" font-size="11">₹100 / day</text>
        <text x="520" y="224" fill="#64748B" font-size="11">₹1,000</text>

        <!-- Row 4: Air Conditioning -->
        <rect x="20" y="248" width="600" height="42" fill="#FFFFFF" stroke="#E2E8F0" rx="4"/>
        <text x="35" y="274" fill="#0F172A" font-weight="600" font-size="11">❄️ AC Breakdown</text>
        <text x="175" y="274" fill="#EA580C" font-weight="700" font-size="10">HIGH</text>
        <text x="270" y="274" fill="#0F172A" font-size="11">24 Hours</text>
        <text x="375" y="274" fill="#059669" font-weight="600" font-size="11">₹200 / day</text>
        <text x="520" y="274" fill="#64748B" font-size="11">₹2,000</text>

        <!-- Row 5: Geyser / Hot Water -->
        <rect x="20" y="298" width="600" height="42" fill="#F8FAFC" stroke="#E2E8F0" rx="4"/>
        <text x="35" y="324" fill="#0F172A" font-weight="600" font-size="11">🚿 Geyser / Heater</text>
        <text x="175" y="324" fill="#EA580C" font-weight="700" font-size="10">HIGH</text>
        <text x="270" y="324" fill="#0F172A" font-size="11">12 Hours</text>
        <text x="375" y="324" fill="#059669" font-weight="600" font-size="11">₹100 / day</text>
        <text x="520" y="324" fill="#64748B" font-size="11">₹800</text>

        <!-- Row 6: Housekeeping -->
        <rect x="20" y="348" width="600" height="42" fill="#FFFFFF" stroke="#E2E8F0" rx="4"/>
        <text x="35" y="374" fill="#0F172A" font-weight="600" font-size="11">🧹 Housekeeping</text>
        <text x="175" y="374" fill="#64748B" font-weight="700" font-size="10">LOW</text>
        <text x="270" y="374" fill="#0F172A" font-size="11">12 Hours</text>
        <text x="375" y="374" fill="#059669" font-weight="600" font-size="11">₹50 / day</text>
        <text x="520" y="374" fill="#64748B" font-size="11">₹400</text>

        <!-- Explanation Card below Table -->
        <rect x="20" y="405" width="600" height="130" fill="#F8FAFC" stroke="#CBD5E1" rx="6"/>
        <text x="35" y="428" fill="#0F172A" font-weight="700" font-size="12">Why This Creates Market Trust:</text>
        <text x="35" y="450" fill="#334155" font-size="11">1. Owners define their SLA terms upfront when listing properties.</text>
        <text x="35" y="470" fill="#334155" font-size="11">2. Residents have contractual certainty that broken services yield rent credits.</text>
        <text x="35" y="490" fill="#334155" font-size="11">3. The PG's SLA compliance rate forms 25% of its public reputation rating.</text>
        <text x="35" y="510" fill="#059669" font-weight="600" font-size="11">4. High compliance PGs rank higher in search algorithms automatically.</text>
    </g>
</svg>"""
    return svg

# -------------------------------------------------------------
# DIAGRAM 6: AI Multi-Agent Gateway & Security Guardrails
# -------------------------------------------------------------
def generate_diagram_6():
    svg = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1400 900" width="100%" height="100%">
{DEFS}
    <!-- Background Canvas -->
    <rect width="1400" height="900" fill="url(#bg-canvas)" rx="16"/>
    <rect x="20" y="20" width="1360" height="860" fill="none" stroke="#E2E8F0" stroke-width="1.5" rx="12"/>

    <!-- Header -->
    <rect x="40" y="40" width="1320" height="60" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1" rx="8" filter="url(#card-shadow)"/>
    <circle cx="70" cy="70" r="16" fill="url(#grad-purple)"/>
    <text x="70" y="75" fill="#FFFFFF" font-weight="800" font-size="14" text-anchor="middle">AI</text>
    <text x="100" y="68" fill="#0F172A" font-weight="700" font-size="18">Stayra — AI Multi-Agent Gateway &amp; Deterministic Guardrails</text>
    <text x="100" y="86" fill="#64748B" font-weight="500" font-size="13">Tool-Calling Architecture, Zod Validation, Zero-Direct-DB-Mutation Invariant &amp; Audit Logging</text>
    <rect x="1190" y="55" width="150" height="30" fill="#F3E8FF" rx="6"/>
    <text x="1265" y="74" fill="#7E22CE" font-weight="600" font-size="12" text-anchor="middle">AI GATEWAY</text>

    <!-- Pipeline: User Input to LLM to Tool Calling to DB -->
    <!-- Column 1: Client Intent -->
    <g transform="translate(50, 125)">
        <rect width="260" height="735" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1.5" rx="10" filter="url(#card-shadow)"/>
        <path d="M 0 10 Q 0 0 10 0 L 250 0 Q 260 0 260 10 L 260 38 L 0 38 Z" fill="#F8FAFC"/>
        <text x="20" y="25" fill="#0F172A" font-weight="700" font-size="13">1. Unstructured User Input</text>

        <!-- Card 1 -->
        <rect x="15" y="55" width="230" height="150" fill="#F8FAFC" stroke="#E2E8F0" rx="6"/>
        <text x="25" y="78" fill="#4F46E5" font-weight="700" font-size="12">Natural Language Discovery</text>
        <rect x="25" y="90" width="210" height="85" fill="#FFFFFF" stroke="#CBD5E1" rx="4"/>
        <text x="35" y="110" fill="#334155" font-size="10">"Find a double sharing</text>
        <text x="35" y="126" fill="#334155" font-size="10">room near Cyber City under</text>
        <text x="35" y="142" fill="#334155" font-size="10">₹14k with AC, veg food and</text>
        <text x="35" y="158" fill="#334155" font-size="10">good WiFi reliability."</text>

        <!-- Card 2 -->
        <rect x="15" y="225" width="230" height="150" fill="#F8FAFC" stroke="#E2E8F0" rx="6"/>
        <text x="25" y="248" fill="#E11D48" font-weight="700" font-size="12">Complaint Voice / Text</text>
        <rect x="25" y="260" width="210" height="85" fill="#FFFFFF" stroke="#CBD5E1" rx="4"/>
        <text x="35" y="280" fill="#334155" font-size="10">"The geyser in Room 302</text>
        <text x="35" y="296" fill="#334155" font-size="10">sparked and tripped the</text>
        <text x="35" y="312" fill="#334155" font-size="10">MCB switchboard. It smells</text>
        <text x="35" y="328" fill="#334155" font-size="10">like burning plastic."</text>

        <!-- Card 3 -->
        <rect x="15" y="395" width="230" height="150" fill="#F8FAFC" stroke="#E2E8F0" rx="6"/>
        <text x="25" y="418" fill="#059669" font-weight="700" font-size="12">Owner Copilot Query</text>
        <rect x="25" y="430" width="210" height="85" fill="#FFFFFF" stroke="#CBD5E1" rx="4"/>
        <text x="35" y="450" fill="#334155" font-size="10">"Show me occupancy and</text>
        <text x="35" y="466" fill="#334155" font-size="10">top recurring maintenance</text>
        <text x="35" y="482" fill="#334155" font-size="10">tickets across my HSR</text>
        <text x="35" y="498" fill="#334155" font-size="10">branches this quarter."</text>
    </g>

    <!-- Column 2: AI Gateway & LLM Orchestrator -->
    <g transform="translate(340, 125)">
        <rect width="320" height="735" fill="#FFFFFF" stroke="#6366F1" stroke-width="2" rx="10" filter="url(#card-shadow)"/>
        <path d="M 0 10 Q 0 0 10 0 L 310 0 Q 320 0 320 10 L 320 38 L 0 38 Z" fill="#EEF2FF"/>
        <text x="20" y="25" fill="#4F46E5" font-weight="700" font-size="13">2. AI Gateway &amp; LLM Tool Calling</text>

        <rect x="15" y="55" width="290" height="135" fill="#F8FAFC" stroke="#E2E8F0" rx="6"/>
        <text x="25" y="78" fill="#0F172A" font-weight="700" font-size="12">Prompt Sanitization &amp; RAG</text>
        <text x="25" y="98" fill="#64748B" font-size="11">• Strips harmful prompt injections</text>
        <text x="25" y="118" fill="#64748B" font-size="11">• Injects tenant session context</text>
        <text x="25" y="138" fill="#64748B" font-size="11">• Injects tool schemas (JSON Schema)</text>
        <text x="25" y="158" fill="#64748B" font-size="11">• Calls LLM (OpenAI / Anthropic / Gemini)</text>

        <!-- Structured Tool Call Emit -->
        <rect x="15" y="205" width="290" height="240" fill="#F8FAFC" stroke="#CBD5E1" rx="6"/>
        <text x="25" y="228" fill="#7C3AED" font-weight="700" font-size="12">Structured Tool Call Payload</text>
        <rect x="25" y="240" width="270" height="185" fill="#0F172A" rx="4"/>
        <text x="35" y="262" fill="#38BDF8" font-size="10" font-family="monospace">tool_name: "create_ticket_draft"</text>
        <text x="35" y="282" fill="#F8FAFC" font-size="10" font-family="monospace">args: &#123;</text>
        <text x="45" y="302" fill="#FCD34D" font-size="10" font-family="monospace">"category": "ELECTRICITY",</text>
        <text x="45" y="322" fill="#FCD34D" font-size="10" font-family="monospace">"severity": "CRITICAL",</text>
        <text x="45" y="342" fill="#FCD34D" font-size="10" font-family="monospace">"hazard": "FIRE_RISK",</text>
        <text x="45" y="362" fill="#FCD34D" font-size="10" font-family="monospace">"sla_hours": 2,</text>
        <text x="45" y="382" fill="#FCD34D" font-size="10" font-family="monospace">"room": "302"</text>
        <text x="35" y="402" fill="#F8FAFC" font-size="10" font-family="monospace">&#125;</text>

        <rect x="15" y="460" width="290" height="250" fill="#EEF2FF" stroke="#C7D2FE" rx="6"/>
        <text x="25" y="485" fill="#4338CA" font-weight="700" font-size="12">AI Gateway Interceptor Rules</text>
        <text x="25" y="510" fill="#334155" font-size="11">1. Intercepts raw tool output</text>
        <text x="25" y="535" fill="#334155" font-size="11">2. Prevents SQL injection or raw queries</text>
        <text x="25" y="560" fill="#334155" font-size="11">3. Verifies tool is permitted for User Role</text>
        <text x="25" y="585" fill="#334155" font-size="11">4. Validates parameters with Zod schema</text>
        <text x="25" y="615" fill="#DC2626" font-weight="700" font-size="11">5. REJECTS if direct ledger write attempted</text>
    </g>

    <!-- Column 3: Guardrail & Validation Engine -->
    <g transform="translate(690, 125)">
        <rect width="320" height="735" fill="#FFFFFF" stroke="#DC2626" stroke-width="2" rx="10" filter="url(#card-shadow)"/>
        <path d="M 0 10 Q 0 0 10 0 L 310 0 Q 320 0 320 10 L 320 38 L 0 38 Z" fill="#FEE2E2"/>
        <text x="20" y="25" fill="#B91C1C" font-weight="700" font-size="13">3. Deterministic Guardrail Layer</text>

        <!-- Guardrail 1 -->
        <rect x="15" y="55" width="290" height="145" fill="#F8FAFC" stroke="#E2E8F0" rx="6"/>
        <text x="25" y="78" fill="#DC2626" font-weight="700" font-size="12">Guardrail 1: Zero Direct DB Write</text>
        <text x="25" y="100" fill="#334155" font-size="11">The LLM can NEVER issue direct UPDATE or</text>
        <text x="25" y="118" fill="#334155" font-size="11">INSERT commands to PostgreSQL.</text>
        <text x="25" y="142" fill="#047857" font-weight="600" font-size="11">✓ It outputs parameters to typed</text>
        <text x="25" y="160" fill="#047857" font-size="11">  NestJS service methods only.</text>

        <!-- Guardrail 2 -->
        <rect x="15" y="215" width="290" height="145" fill="#F8FAFC" stroke="#E2E8F0" rx="6"/>
        <text x="25" y="238" fill="#DC2626" font-weight="700" font-size="12">Guardrail 2: Zod Schema Defense</text>
        <text x="25" y="260" fill="#334155" font-size="11">All arguments validated against strict Zod</text>
        <text x="25" y="278" fill="#334155" font-size="11">schemas before service invocation.</text>
        <text x="25" y="302" fill="#B91C1C" font-weight="600" font-size="11">✗ Any unexpected field throws</text>
        <text x="25" y="320" fill="#B91C1C" font-size="11">  BadRequestException immediately.</text>

        <!-- Guardrail 3 -->
        <rect x="15" y="375" width="290" height="155" fill="#F8FAFC" stroke="#E2E8F0" rx="6"/>
        <text x="25" y="398" fill="#DC2626" font-weight="700" font-size="12">Guardrail 3: Immutable AI Audit Log</text>
        <text x="25" y="420" fill="#334155" font-size="11">Every prompt, output, tool call, token count,</text>
        <text x="25" y="438" fill="#334155" font-size="11">and execution latency is written to</text>
        <text x="25" y="456" fill="#4F46E5" font-weight="600" font-size="11">ai_audit_logs table.</text>
        <text x="25" y="480" fill="#64748B" font-size="10">• Full forensic traceability</text>
        <text x="25" y="498" fill="#64748B" font-size="10">• Tracks AI cost &amp; model hallucination rate</text>

        <!-- Summary Badge -->
        <rect x="15" y="545" width="290" height="165" fill="#ECFDF5" stroke="#10B981" rx="6"/>
        <text x="25" y="575" fill="#047857" font-weight="800" font-size="13">SAFE AI IN PRACTICE:</text>
        <text x="25" y="605" fill="#065F46" font-size="11">AI classifies tickets &amp; recommends PGs,</text>
        <text x="25" y="625" fill="#065F46" font-size="11">flags billing spikes &amp; assists owners,</text>
        <text x="25" y="650" fill="#047857" font-weight="700" font-size="11">BUT deterministic backend code always</text>
        <text x="25" y="668" fill="#047857" font-weight="700" font-size="11">governs money, tenancy, and locks.</text>
    </g>

    <!-- Column 4: Verified Execution in Backend -->
    <g transform="translate(1040, 125)">
        <rect width="310" height="735" fill="#FFFFFF" stroke="#059669" stroke-width="2" rx="10" filter="url(#card-shadow)"/>
        <path d="M 0 10 Q 0 0 10 0 L 300 0 Q 310 0 310 10 L 310 38 L 0 38 Z" fill="#ECFDF5"/>
        <text x="20" y="25" fill="#047857" font-weight="700" font-size="13">4. Deterministic Backend Execution</text>

        <rect x="15" y="55" width="280" height="145" fill="#F8FAFC" stroke="#E2E8F0" rx="6"/>
        <text x="25" y="78" fill="#047857" font-weight="700" font-size="12">PostGIS Geo Search</text>
        <text x="25" y="98" fill="#334155" font-size="11">Executed by PropertyService:</text>
        <text x="25" y="118" fill="#64748B" font-size="10">SELECT * FROM properties</text>
        <text x="25" y="134" fill="#64748B" font-size="10">WHERE ST_DWithin(coords, point, 3000)</text>
        <text x="25" y="150" fill="#64748B" font-size="10">AND base_rent &lt;= 14000</text>
        <text x="25" y="172" fill="#059669" font-weight="600" font-size="11">✓ Returns ranked PG list</text>

        <rect x="15" y="215" width="280" height="145" fill="#F8FAFC" stroke="#E2E8F0" rx="6"/>
        <text x="25" y="238" fill="#047857" font-weight="700" font-size="12">Ticket Dispatch &amp; SLA Timer</text>
        <text x="25" y="258" fill="#334155" font-size="11">Executed by ComplaintService:</text>
        <text x="25" y="278" fill="#64748B" font-size="10">• Ticket created in database</text>
        <text x="25" y="296" fill="#64748B" font-size="10">• sla_target_time = NOW() + 2 hours</text>
        <text x="25" y="314" fill="#64748B" font-size="10">• Urgent alert sent to electrician</text>
        <text x="25" y="336" fill="#059669" font-weight="600" font-size="11">✓ Ticket #TKT-892 active</text>

        <rect x="15" y="375" width="280" height="145" fill="#F8FAFC" stroke="#E2E8F0" rx="6"/>
        <text x="25" y="398" fill="#047857" font-weight="700" font-size="12">Billing Anomaly Flag</text>
        <text x="25" y="418" fill="#334155" font-size="11">Executed by BillingService:</text>
        <text x="25" y="438" fill="#64748B" font-size="10">• Flags bill for owner review</text>
        <text x="25" y="456" fill="#64748B" font-size="10">• Sub-meter photo requested</text>
        <text x="25" y="474" fill="#64748B" font-size="10">• Holds publication until verified</text>
        <text x="25" y="496" fill="#059669" font-weight="600" font-size="11">✓ Prevents erroneous debit</text>

        <!-- Final Flow Arrow -->
        <rect x="15" y="535" width="280" height="175" fill="#F8FAFC" stroke="#CBD5E1" rx="6"/>
        <text x="25" y="565" fill="#0F172A" font-weight="700" font-size="12">Client Response Synthesis</text>
        <text x="25" y="590" fill="#334155" font-size="11">Sanitized, structured data returned</text>
        <text x="25" y="610" fill="#334155" font-size="11">to client with verified links,</text>
        <text x="25" y="630" fill="#334155" font-size="11">coordinates, and ticket numbers.</text>
        <text x="25" y="660" fill="#4F46E5" font-weight="700" font-size="12">✓ Zero Hallucination Risk</text>
    </g>

    <!-- Connectors -->
    <path d="M 310 320 L 340 320" stroke="#6366F1" stroke-width="2.5" marker-end="url(#arrow-indigo)"/>
    <path d="M 660 320 L 690 320" stroke="#DC2626" stroke-width="2.5" marker-end="url(#arrow-rose)"/>
    <path d="M 1010 320 L 1040 320" stroke="#059669" stroke-width="2.5" marker-end="url(#arrow-emerald)"/>
</svg>"""
    return svg

# -------------------------------------------------------------
# DIAGRAM 7: Mobile Client Architecture & State Flow
# -------------------------------------------------------------
def generate_diagram_7():
    svg = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1400 900" width="100%" height="100%">
{DEFS}
    <!-- Background Canvas -->
    <rect width="1400" height="900" fill="url(#bg-canvas)" rx="16"/>
    <rect x="20" y="20" width="1360" height="860" fill="none" stroke="#E2E8F0" stroke-width="1.5" rx="12"/>

    <!-- Header -->
    <rect x="40" y="40" width="1320" height="60" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1" rx="8" filter="url(#card-shadow)"/>
    <circle cx="70" cy="70" r="16" fill="url(#grad-indigo)"/>
    <text x="70" y="75" fill="#FFFFFF" font-weight="800" font-size="14" text-anchor="middle">RN</text>
    <text x="100" y="68" fill="#0F172A" font-weight="700" font-size="18">Stayra — Mobile Client Architecture &amp; State Synchronization</text>
    <text x="100" y="86" fill="#64748B" font-weight="500" font-size="13">React Native Expo Router, Zustand Store, TanStack Query v5, Token Rotation &amp; Offline Cache</text>
    <rect x="1190" y="55" width="150" height="30" fill="#EEF2FF" rx="6"/>
    <text x="1265" y="74" fill="#4F46E5" font-weight="600" font-size="12" text-anchor="middle">MOBILE FLOW</text>

    <!-- Column 1: UI & Navigation Layer -->
    <g transform="translate(50, 125)">
        <rect width="300" height="735" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1.5" rx="10" filter="url(#card-shadow)"/>
        <path d="M 0 10 Q 0 0 10 0 L 290 0 Q 300 0 300 10 L 300 38 L 0 38 Z" fill="#F8FAFC"/>
        <text x="20" y="25" fill="#0F172A" font-weight="700" font-size="14">1. Expo Router v3 Navigation Tree</text>

        <rect x="15" y="55" width="270" height="95" fill="#EEF2FF" stroke="#C7D2FE" rx="6"/>
        <text x="25" y="78" fill="#4F46E5" font-weight="700" font-size="12">Root Layout: app/_layout.tsx</text>
        <text x="25" y="98" fill="#64748B" font-size="10">• QueryClientProvider (TanStack)</text>
        <text x="25" y="116" fill="#64748B" font-size="10">• AuthSessionProvider (Zustand)</text>
        <text x="25" y="134" fill="#64748B" font-size="10">• Role-based route guard redirect</text>

        <!-- Route Branch 1: Auth -->
        <rect x="15" y="165" width="270" height="100" fill="#F8FAFC" stroke="#E2E8F0" rx="6"/>
        <text x="25" y="188" fill="#0F172A" font-weight="700" font-size="12">(auth) / Public Stack</text>
        <text x="25" y="208" fill="#334155" font-size="11">• login.tsx (Phone Number OTP)</text>
        <text x="25" y="228" fill="#334155" font-size="11">• verify-otp.tsx (6-digit input)</text>
        <text x="25" y="248" fill="#334155" font-size="11">• role-select.tsx (Resident / Owner)</text>

        <!-- Route Branch 2: Resident -->
        <rect x="15" y="280" width="270" height="155" fill="#F8FAFC" stroke="#E2E8F0" rx="6"/>
        <text x="25" y="303" fill="#10B981" font-weight="700" font-size="12">(resident) / Tab Navigator</text>
        <text x="25" y="323" fill="#334155" font-size="11">• (tabs)/discover (Map &amp; Search)</text>
        <text x="25" y="343" fill="#334155" font-size="11">• (tabs)/my-stay (Active Tenancy)</text>
        <text x="25" y="363" fill="#334155" font-size="11">• (tabs)/tickets (Complaints &amp; SLA)</text>
        <text x="25" y="383" fill="#334155" font-size="11">• (tabs)/bills (Rent &amp; Razorpay)</text>
        <text x="25" y="403" fill="#334155" font-size="11">• (tabs)/profile (Stayra ID &amp; KYC)</text>

        <!-- Route Branch 3: Owner -->
        <rect x="15" y="450" width="270" height="135" fill="#F8FAFC" stroke="#E2E8F0" rx="6"/>
        <text x="25" y="473" fill="#D97706" font-weight="700" font-size="12">(owner) / Tab Navigator</text>
        <text x="25" y="493" fill="#334155" font-size="11">• (tabs)/dashboard (Revenue, Occ %)</text>
        <text x="25" y="513" fill="#334155" font-size="11">• (tabs)/properties (Beds &amp; Rooms)</text>
        <text x="25" y="533" fill="#334155" font-size="11">• (tabs)/complaints (Kanban &amp; SLA)</text>
        <text x="25" y="553" fill="#334155" font-size="11">• (tabs)/billing (Meter Reads &amp; Dues)</text>

        <!-- Modals -->
        <rect x="15" y="600" width="270" height="110" fill="#F8FAFC" stroke="#E2E8F0" rx="6"/>
        <text x="25" y="623" fill="#6366F1" font-weight="700" font-size="12">Shared Modal Sheets</text>
        <text x="25" y="643" fill="#334155" font-size="11">• ai-copilot-drawer.tsx</text>
        <text x="25" y="663" fill="#334155" font-size="11">• filter-bottom-sheet.tsx</text>
        <text x="25" y="683" fill="#334155" font-size="11">• payment-success-modal.tsx</text>
    </g>

    <!-- Column 2: Client State (Zustand & SecureStore) -->
    <g transform="translate(380, 125)">
        <rect width="300" height="735" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1.5" rx="10" filter="url(#card-shadow)"/>
        <path d="M 0 10 Q 0 0 10 0 L 290 0 Q 300 0 300 10 L 300 38 L 0 38 Z" fill="#F8FAFC"/>
        <text x="20" y="25" fill="#0F172A" font-weight="700" font-size="14">2. Client State &amp; Secure Storage</text>

        <!-- Zustand Auth Store -->
        <rect x="15" y="55" width="270" height="155" fill="#F8FAFC" stroke="#E2E8F0" rx="6"/>
        <text x="25" y="78" fill="#4F46E5" font-weight="700" font-size="12">useAuthStore (Zustand)</text>
        <text x="25" y="100" fill="#334155" font-size="11">• user: UserPayload | null</text>
        <text x="25" y="120" fill="#334155" font-size="11">• activeRole: 'RESIDENT' | 'OWNER'</text>
        <text x="25" y="140" fill="#334155" font-size="11">• stayraResidentId: string | null</text>
        <text x="25" y="160" fill="#334155" font-size="11">• setSession(), clearSession()</text>
        <text x="25" y="180" fill="#059669" font-weight="600" font-size="11">✓ In-Memory Reactive State</text>

        <!-- SecureStore -->
        <rect x="15" y="225" width="270" height="155" fill="#F8FAFC" stroke="#E2E8F0" rx="6"/>
        <text x="25" y="248" fill="#0284C7" font-weight="700" font-size="12">Expo SecureStore (Keychain)</text>
        <text x="25" y="270" fill="#334155" font-size="11">• JWT Access Token (15 min expiry)</text>
        <text x="25" y="290" fill="#334155" font-size="11">• Refresh Token (30 days rotatable)</text>
        <text x="25" y="310" fill="#334155" font-size="11">• Biometric Key Pair Storage</text>
        <text x="25" y="335" fill="#DC2626" font-weight="600" font-size="11">🔒 Never stored in plain</text>
        <text x="25" y="353" fill="#DC2626" font-size="10">AsyncStorage to prevent token theft</text>

        <!-- UI Filter Store -->
        <rect x="15" y="395" width="270" height="135" fill="#F8FAFC" stroke="#E2E8F0" rx="6"/>
        <text x="25" y="418" fill="#D97706" font-weight="700" font-size="12">useSearchStore (Zustand)</text>
        <text x="25" y="440" fill="#334155" font-size="11">• budgetRange: [5000, 25000]</text>
        <text x="25" y="460" fill="#334155" font-size="11">• selectedSharing: ['SINGLE', 'DOUBLE']</text>
        <text x="25" y="480" fill="#334155" font-size="11">• amenities: ['WIFI', 'AC', 'FOOD']</text>
        <text x="25" y="500" fill="#334155" font-size="11">• coordinates: {{ lat, lng, radiusKm }}</text>

        <!-- Offline Queue -->
        <rect x="15" y="545" width="270" height="165" fill="#F8FAFC" stroke="#E2E8F0" rx="6"/>
        <text x="25" y="568" fill="#7C3AED" font-weight="700" font-size="12">Offline Mutation Queue</text>
        <text x="25" y="590" fill="#334155" font-size="11">• Ticket draft photos saved locally</text>
        <text x="25" y="610" fill="#334155" font-size="11">• Retries POST when network returns</text>
        <text x="25" y="630" fill="#334155" font-size="11">• NetInfo listener handles resume</text>
        <text x="25" y="660" fill="#059669" font-weight="600" font-size="11">✓ Seamless connectivity recovery</text>
    </g>

    <!-- Column 3: Server State (TanStack Query v5) -->
    <g transform="translate(710, 125)">
        <rect width="320" height="735" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1.5" rx="10" filter="url(#card-shadow)"/>
        <path d="M 0 10 Q 0 0 10 0 L 310 0 Q 320 0 320 10 L 320 38 L 0 38 Z" fill="#F8FAFC"/>
        <text x="20" y="25" fill="#0F172A" font-weight="700" font-size="14">3. TanStack Server State &amp; Cache</text>

        <rect x="15" y="55" width="290" height="145" fill="#F8FAFC" stroke="#E2E8F0" rx="6"/>
        <text x="25" y="78" fill="#059669" font-weight="700" font-size="12">Query Keys &amp; Caching Matrix</text>
        <text x="25" y="100" fill="#334155" font-size="11">• ['properties', 'search', filters]</text>
        <text x="25" y="118" fill="#64748B" font-size="10">  staleTime: 5 mins, gcTime: 30 mins</text>
        <text x="25" y="138" fill="#334155" font-size="11">• ['complaints', 'active']</text>
        <text x="25" y="156" fill="#64748B" font-size="10">  staleTime: 30 secs, auto refetch</text>
        <text x="25" y="176" fill="#334155" font-size="11">• ['bills', 'current-due']</text>

        <!-- Optimistic Updates -->
        <rect x="15" y="215" width="290" height="155" fill="#ECFDF5" stroke="#10B981" rx="6"/>
        <text x="25" y="238" fill="#047857" font-weight="700" font-size="12">Optimistic Mutation Pipeline</text>
        <text x="25" y="260" fill="#065F46" font-size="11">1. User comments on ticket or confirms fix</text>
        <text x="25" y="280" fill="#065F46" font-size="11">2. UI updates immediately (0ms lag)</text>
        <text x="25" y="300" fill="#065F46" font-size="11">3. Network mutation dispatched in background</text>
        <text x="25" y="320" fill="#065F46" font-size="11">4. On error: Rollback to previous state</text>
        <text x="25" y="340" fill="#047857" font-weight="700" font-size="11">✓ Native 60fps responsiveness</text>

        <!-- Background Sync -->
        <rect x="15" y="385" width="290" height="145" fill="#F8FAFC" stroke="#E2E8F0" rx="6"/>
        <text x="25" y="408" fill="#4F46E5" font-weight="700" font-size="12">Background Invalidation Triggers</text>
        <text x="25" y="430" fill="#334155" font-size="11">• When payment webhook arrives:</text>
        <text x="25" y="448" fill="#64748B" font-size="10">  queryClient.invalidateQueries(['bills'])</text>
        <text x="25" y="468" fill="#334155" font-size="11">• When ticket resolved:</text>
        <text x="25" y="486" fill="#64748B" font-size="10">  queryClient.invalidateQueries(['complaints'])</text>
        <text x="25" y="506" fill="#059669" font-weight="600" font-size="11">✓ Zero stale data across tabs</text>

        <!-- Push WebSocket Bridge -->
        <rect x="15" y="545" width="290" height="165" fill="#F8FAFC" stroke="#E2E8F0" rx="6"/>
        <text x="25" y="568" fill="#D97706" font-weight="700" font-size="12">Push Notification &amp; WebSockets</text>
        <text x="25" y="590" fill="#334155" font-size="11">• WebSocket gateway for live ticket chat</text>
        <text x="25" y="610" fill="#334155" font-size="11">• Push alerts wake app in background</text>
        <text x="25" y="630" fill="#334155" font-size="11">• Deep links route directly to:</text>
        <text x="25" y="650" fill="#6366F1" font-weight="600" font-size="10">  stayra://complaints/TKT-892</text>
    </g>

    <!-- Column 4: Network Layer (Axios with Token Mutex) -->
    <g transform="translate(1060, 125)">
        <rect width="290" height="735" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1.5" rx="10" filter="url(#card-shadow)"/>
        <path d="M 0 10 Q 0 0 10 0 L 280 0 Q 290 0 290 10 L 290 38 L 0 38 Z" fill="#F8FAFC"/>
        <text x="20" y="25" fill="#0F172A" font-weight="700" font-size="14">4. Network Layer &amp; Token Mutex</text>

        <rect x="15" y="55" width="260" height="165" fill="#F8FAFC" stroke="#E2E8F0" rx="6"/>
        <text x="25" y="78" fill="#4F46E5" font-weight="700" font-size="12">Request Interceptor</text>
        <text x="25" y="100" fill="#334155" font-size="11">1. Reads accessToken from SecureStore</text>
        <text x="25" y="120" fill="#334155" font-size="11">2. Adds Authorization Header:</text>
        <text x="25" y="138" fill="#64748B" font-size="10">  Bearer eyJhbGciOi...</text>
        <text x="25" y="160" fill="#334155" font-size="11">3. Appends X-Device-ID &amp; App Version</text>
        <text x="25" y="180" fill="#334155" font-size="11">4. Dispatches request to NestJS ALB</text>

        <!-- Response Interceptor with Mutex -->
        <rect x="15" y="235" width="260" height="260" fill="#F8FAFC" stroke="#E2E8F0" rx="6"/>
        <text x="25" y="258" fill="#DC2626" font-weight="700" font-size="12">Response Interceptor (401 Mutex)</text>
        <text x="25" y="280" fill="#334155" font-size="11">Receives HTTP 401 Unauthorized?</text>
        <text x="25" y="305" fill="#D97706" font-weight="600" font-size="11">1. Acquire Token Refresh Mutex</text>
        <text x="25" y="325" fill="#64748B" font-size="10">(Queues concurrent failed requests)</text>
        <text x="25" y="350" fill="#047857" font-weight="600" font-size="11">2. POST /auth/refresh with token</text>
        <text x="25" y="375" fill="#334155" font-size="11">3. Save new access &amp; refresh token</text>
        <text x="25" y="395" fill="#334155" font-size="11">4. Replay queued requests with</text>
        <text x="25" y="413" fill="#64748B" font-size="10">new Bearer token seamlessly</text>
        <text x="25" y="435" fill="#DC2626" font-size="10">If refresh fails: Clear session &amp;</text>
        <text x="25" y="453" fill="#DC2626" font-size="10">redirect to (auth)/login</text>

        <!-- Summary -->
        <rect x="15" y="510" width="260" height="200" fill="#EEF2FF" stroke="#C7D2FE" rx="6"/>
        <text x="25" y="535" fill="#4338CA" font-weight="700" font-size="12">Reliability Summary</text>
        <text x="25" y="560" fill="#334155" font-size="11">• Zero user session drops</text>
        <text x="25" y="585" fill="#334155" font-size="11">• Full offline-first capabilities</text>
        <text x="25" y="610" fill="#334155" font-size="11">• High-speed cache revalidation</text>
        <text x="25" y="635" fill="#334155" font-size="11">• Strict hardware-backed security</text>
        <text x="25" y="665" fill="#059669" font-weight="700" font-size="12">Production Mobile Grade</text>
    </g>
</svg>"""
    return svg

# -------------------------------------------------------------
# DIAGRAM 8: Production Deployment & Infrastructure Topology
# -------------------------------------------------------------
def generate_diagram_8():
    svg = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1400 900" width="100%" height="100%">
{DEFS}
    <!-- Background Canvas -->
    <rect width="1400" height="900" fill="url(#bg-canvas)" rx="16"/>
    <rect x="20" y="20" width="1360" height="860" fill="none" stroke="#E2E8F0" stroke-width="1.5" rx="12"/>

    <!-- Header -->
    <rect x="40" y="40" width="1320" height="60" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1" rx="8" filter="url(#card-shadow)"/>
    <circle cx="70" cy="70" r="16" fill="url(#grad-dark)"/>
    <text x="70" y="75" fill="#FFFFFF" font-weight="800" font-size="14" text-anchor="middle">☁</text>
    <text x="100" y="68" fill="#0F172A" font-weight="700" font-size="18">Stayra — Production Cloud Infrastructure &amp; Deployment Topology</text>
    <text x="100" y="86" fill="#64748B" font-weight="500" font-size="13">Multi-AZ High Availability: AWS ECS Fargate, Aurora PostgreSQL PostGIS, ElastiCache Redis &amp; CloudFront</text>
    <rect x="1190" y="55" width="150" height="30" fill="#F1F5F9" rx="6"/>
    <text x="1265" y="74" fill="#334155" font-weight="600" font-size="12" text-anchor="middle">INFRASTRUCTURE</text>

    <!-- Boundary: AWS Cloud VPC -->
    <g transform="translate(50, 125)">
        <rect width="1300" height="735" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1.5" rx="10" filter="url(#card-shadow)"/>
        <path d="M 0 10 Q 0 0 10 0 L 1290 0 Q 1300 0 1300 10 L 1300 38 L 0 38 Z" fill="#0F172A"/>
        <text x="20" y="25" fill="#FFFFFF" font-weight="700" font-size="13">AWS Cloud Virtual Private Cloud (VPC) — ap-south-1 (Mumbai Region)</text>
        <text x="1280" y="25" fill="#94A3B8" font-size="11" text-anchor="end">Multi-AZ Redundancy (AZ-1a &amp; AZ-1b)</text>

        <!-- 1. Ingress & Edge Layer -->
        <g transform="translate(25, 55)">
            <rect width="380" height="150" fill="#F8FAFC" stroke="#CBD5E1" rx="8"/>
            <text x="20" y="25" fill="#0F172A" font-weight="700" font-size="13">1. Edge &amp; Ingress Security Layer</text>
            <text x="20" y="50" fill="#334155" font-size="11">• <tspan font-weight="600">Cloudflare DNS &amp; DDoS Shield:</tspan> Anycast network</text>
            <text x="20" y="72" fill="#334155" font-size="11">• <tspan font-weight="600">AWS CloudFront CDN:</tspan> Static photos &amp; PDFs cache</text>
            <text x="20" y="94" fill="#334155" font-size="11">• <tspan font-weight="600">AWS WAF v2:</tspan> Rate limiting &amp; bot mitigation</text>
            <text x="20" y="116" fill="#334155" font-size="11">• <tspan font-weight="600">Application Load Balancer:</tspan> TLS 1.3 Termination</text>
            <text x="20" y="134" fill="#059669" font-weight="600" font-size="10">Auto-scales across public subnets in AZ-1a / AZ-1b</text>
        </g>

        <!-- 2. ECS Fargate Application Cluster -->
        <g transform="translate(435, 55)">
            <rect width="450" height="300" fill="#F8FAFC" stroke="#4F46E5" stroke-width="1.5" rx="8"/>
            <text x="20" y="25" fill="#4F46E5" font-weight="700" font-size="13">2. Compute Layer: AWS ECS Fargate Cluster</text>

            <!-- Container 1: API Task -->
            <rect x="20" y="45" width="410" height="110" fill="#FFFFFF" stroke="#E2E8F0" rx="6"/>
            <text x="35" y="68" fill="#0F172A" font-weight="700" font-size="12">Stayra API Containers (NestJS Node.js 20)</text>
            <text x="35" y="88" fill="#334155" font-size="11">• Min: 2 tasks, Max: 10 tasks (Target CPU &lt; 65%)</text>
            <text x="35" y="108" fill="#334155" font-size="11">• Serves REST endpoints, WebSockets, and Auth</text>
            <text x="35" y="128" fill="#64748B" font-size="10">• Health checks at /health every 15s</text>

            <!-- Container 2: Worker Task -->
            <rect x="20" y="165" width="410" height="115" fill="#FFFFFF" stroke="#E2E8F0" rx="6"/>
            <text x="35" y="188" fill="#047857" font-weight="700" font-size="12">Stayra BullMQ Worker Tasks</text>
            <text x="35" y="208" fill="#334155" font-size="11">• Independent auto-scaling task group</text>
            <text x="35" y="228" fill="#334155" font-size="11">• Processes billing generation, SLA heartbeat, push alerts</text>
            <text x="35" y="248" fill="#334155" font-size="11">• Dead-letter queues (DLQ) with Sentry error alerting</text>
        </g>

        <!-- 3. Persistence Layer -->
        <g transform="translate(915, 55)">
            <rect width="360" height="300" fill="#F8FAFC" stroke="#0284C7" stroke-width="1.5" rx="8"/>
            <text x="20" y="25" fill="#0284C7" font-weight="700" font-size="13">3. Database &amp; Cache Tier</text>

            <!-- Aurora PG -->
            <rect x="20" y="45" width="320" height="110" fill="#FFFFFF" stroke="#E2E8F0" rx="6"/>
            <text x="35" y="68" fill="#0F172A" font-weight="700" font-size="12">Amazon Aurora PostgreSQL 16</text>
            <text x="35" y="88" fill="#334155" font-size="11">• PostGIS + pgvector extensions enabled</text>
            <text x="35" y="108" fill="#334155" font-size="11">• Multi-AZ Primary with 1 Read Replica</text>
            <text x="35" y="128" fill="#059669" font-weight="600" font-size="10">Automated daily snapshots + 30-day retention</text>

            <!-- Redis Cluster -->
            <rect x="20" y="165" width="320" height="115" fill="#FFFFFF" stroke="#E2E8F0" rx="6"/>
            <text x="35" y="188" fill="#DC2626" font-weight="700" font-size="12">Amazon ElastiCache Redis 7.2</text>
            <text x="35" y="208" fill="#334155" font-size="11">• Multi-AZ with automatic failover</text>
            <text x="35" y="228" fill="#334155" font-size="11">• Manages BullMQ job queues and OTP rate limits</text>
            <text x="35" y="248" fill="#64748B" font-size="10">In-memory caching of search queries &amp; sessions</text>
        </g>

        <!-- 4. Storage & Media Layer -->
        <g transform="translate(25, 230)">
            <rect width="380" height="125" fill="#F8FAFC" stroke="#D97706" stroke-width="1.5" rx="8"/>
            <text x="20" y="25" fill="#D97706" font-weight="700" font-size="13">4. Secure Object Storage Tier</text>
            <text x="20" y="48" fill="#334155" font-size="11">• <tspan font-weight="600">AWS S3 Private Bucket:</tspan> KYC documents &amp; invoices</text>
            <text x="20" y="70" fill="#334155" font-size="11">• <tspan font-weight="600">AWS S3 Public Bucket:</tspan> PG room photos &amp; floor plans</text>
            <text x="20" y="92" fill="#334155" font-size="11">• Server-Side Encryption (SSE-KMS)</text>
            <text x="20" y="112" fill="#059669" font-weight="600" font-size="10">Pre-signed URL uploads with 15-minute expiry</text>
        </g>

        <!-- 5. Observability & Monitoring Infrastructure -->
        <g transform="translate(25, 385)">
            <rect width="1250" height="325" fill="#F8FAFC" stroke="#64748B" stroke-width="1.5" rx="8"/>
            <text x="25" y="28" fill="#0F172A" font-weight="700" font-size="14">5. Unified Observability &amp; Telemetry Stack</text>

            <g transform="translate(25, 45)">
                <rect width="280" height="250" fill="#FFFFFF" stroke="#E2E8F0" rx="6"/>
                <text x="20" y="26" fill="#4F46E5" font-weight="700" font-size="12">Structured Logging</text>
                <text x="20" y="50" fill="#334155" font-size="11">• JSON format with correlation ID</text>
                <text x="20" y="70" fill="#334155" font-size="11">• Shipped to AWS CloudWatch Logs</text>
                <text x="20" y="90" fill="#334155" font-size="11">• PII redaction on phone &amp; IDs</text>
                <text x="20" y="110" fill="#334155" font-size="11">• Audit logs for all financial edits</text>
                <text x="20" y="140" fill="#64748B" font-size="10">Log aggregation with Elasticsearch /</text>
                <text x="20" y="156" fill="#64748B" font-size="10">Datadog for instant grep &amp; alerts</text>
            </g>

            <g transform="translate(330, 45)">
                <rect width="280" height="250" fill="#FFFFFF" stroke="#E2E8F0" rx="6"/>
                <text x="20" y="26" fill="#059669" font-weight="700" font-size="12">Metrics &amp; Alerting</text>
                <text x="20" y="50" fill="#334155" font-size="11">• Prometheus metrics endpoint</text>
                <text x="20" y="70" fill="#334155" font-size="11">• Grafana executive dashboard</text>
                <text x="20" y="90" fill="#334155" font-size="11">• Tracks P95 latency (&lt; 150ms)</text>
                <text x="20" y="110" fill="#334155" font-size="11">• Tracks payment webhook failure rate</text>
                <text x="20" y="130" fill="#334155" font-size="11">• Tracks BullMQ job queue depth</text>
                <text x="20" y="156" fill="#DC2626" font-weight="600" font-size="10">PagerDuty alerts on high error rate</text>
            </g>

            <g transform="translate(635, 45)">
                <rect width="280" height="250" fill="#FFFFFF" stroke="#E2E8F0" rx="6"/>
                <text x="20" y="26" fill="#D97706" font-weight="700" font-size="12">Distributed APM Tracing</text>
                <text x="20" y="50" fill="#334155" font-size="11">• OpenTelemetry SDK in NestJS</text>
                <text x="20" y="70" fill="#334155" font-size="11">• Traces end-to-end request latency:</text>
                <text x="20" y="90" fill="#64748B" font-size="10">  Mobile → ALB → NestJS → SQL</text>
                <text x="20" y="115" fill="#334155" font-size="11">• Identifies slow PostGIS spatial</text>
                <text x="20" y="132" fill="#334155" font-size="11">  queries or AI gateway latency</text>
                <text x="20" y="156" fill="#059669" font-weight="600" font-size="10">Pinpoints database bottle necks</text>
            </g>

            <g transform="translate(940, 45)">
                <rect width="280" height="250" fill="#FFFFFF" stroke="#E2E8F0" rx="6"/>
                <text x="20" y="26" fill="#DC2626" font-weight="700" font-size="12">Error Tracking &amp; Sentry</text>
                <text x="20" y="50" fill="#334155" font-size="11">• Sentry SDK in React Native mobile</text>
                <text x="20" y="70" fill="#334155" font-size="11">• Sentry SDK in NestJS backend</text>
                <text x="20" y="90" fill="#334155" font-size="11">• Captures unhandled exceptions</text>
                <text x="20" y="110" fill="#334155" font-size="11">• Tracks mobile crash-free rate (&gt;99.8%)</text>
                <text x="20" y="130" fill="#334155" font-size="11">• Breadcrumbs link user actions to</text>
                <text x="20" y="148" fill="#334155" font-size="11">  exact error stack traces</text>
            </g>
        </g>
    </g>
</svg>"""
    return svg

def main():
    diagrams = {
        "01_system_topology.svg": generate_diagram_1(),
        "02_end_to_end_data_flow.svg": generate_diagram_2(),
        "03_entity_relationship.svg": generate_diagram_3(),
        "04_financial_ledger_billing_flow.svg": generate_diagram_4(),
        "05_sla_breach_compensation_flow.svg": generate_diagram_5(),
        "06_ai_multi_agent_guardrails.svg": generate_diagram_6(),
        "07_mobile_client_architecture.svg": generate_diagram_7(),
        "08_deployment_infrastructure.svg": generate_diagram_8(),
    }

    for filename, content in diagrams.items():
        filepath = os.path.join(OUTPUT_DIR, filename)
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"Generated: {filepath} ({len(content)} bytes)")

if __name__ == "__main__":
    main()
