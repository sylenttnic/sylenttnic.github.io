"use client";

import { useEffect } from "react";
import "./agents.css";

export default function AgentsPage() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    document.querySelectorAll('.particle').forEach((p, i) => {
      const el = p as HTMLElement;
      const base = parseFloat(el.style.animationDelay) || 0;
      el.style.animationDelay = (base + (i * 0.3) % 1.2) + 's';
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="agents-page-wrap pt-32 md:pt-48">
      {/* HEADER */}
      <div className="agents-header fade-in">
        <div className="logo-tag">Sylentt AI Team Workflow</div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">How Our AI Agents Build Software</h1>
        <p className="subtitle">A 12-step automated assembly line with 8 strict safety checkpoints. This map shows exactly what each AI assistant does, what information they look at, and what they create.</p>
      </div>

      {/* PHASE 1 */}
      <div className="lane reveal">
        <div className="lane-header">
          <span className="lane-badge blue"><span className="badge-text">Phase 1</span></span>
          <span className="lane-desc">Discovery &amp; Planning</span>
          <span className="lane-line"></span>
        </div>
        <div className="lane-body">
          <div className="lane-agents">
            <div className="agent-node">
              <div className="agent-card blue">
                <div className="agent-number">AGENT 01</div>
                <div className="agent-title"><span className="orb blue"></span> System Explorer</div>
                <div className="agent-purpose">Reviews what already exists in our system. Creates a map of current setups so other agents know the landscape before they start working.</div>
                <div className="agent-meta">
                  <span className="tag tag-blue">Triggered: By Human</span>
                  <span className="tag tag-dim">Planning Only</span>
                </div>
              </div>
              <div className="sub-nodes">
                <div className="sub-node-group-label">Information Reviewed</div>
                <div className="sub-node"><span className="sub-node-icon">📖</span><span className="sub-node-name">Platform Rules</span><span className="sub-node-desc">Our standards</span></div>
                <div className="sub-node"><span className="sub-node-icon">📖</span><span className="sub-node-name">To-Do List</span><span className="sub-node-desc">Current requests</span></div>
                <div className="sub-node-group-label">Created by this Agent</div>
                <div className="sub-node"><span className="sub-node-icon">✏️</span><span className="sub-node-name">System Map</span><span className="sub-node-desc">Current layout</span></div>
                <div className="sub-node"><span className="sub-node-icon">✏️</span><span className="sub-node-name">Task Outline</span><span className="sub-node-desc">High-level goals</span></div>
              </div>
            </div>

            <div className="h-connector"><div className="h-connector-line"><div className="particle blue" style={{ animationDelay: '0s' }}></div></div></div>

            <div className="agent-node">
              <div className="agent-card cyan">
                <div className="agent-number">AGENT 02</div>
                <div className="agent-title"><span className="orb cyan"></span> Requirements Analyst</div>
                <div className="agent-purpose">Studies the external tools we need to connect to. Figures out exactly how they work and writes a detailed blueprint of what needs to be built.</div>
                <div className="agent-meta">
                  <span className="tag tag-cyan">Triggered: By Explorer</span>
                  <span className="tag tag-dim">Planning Only</span>
                </div>
              </div>
              <div className="sub-nodes">
                <div className="sub-node-group-label">Information Reviewed</div>
                <div className="sub-node"><span className="sub-node-icon">📖</span><span className="sub-node-name">Past Mistakes Log</span><span className="sub-node-desc">Things to avoid</span></div>
                <div className="sub-node"><span className="sub-node-icon">📖</span><span className="sub-node-name">Tool Manuals</span><span className="sub-node-desc">External instructions</span></div>
                <div className="sub-node"><span className="sub-node-icon">📖</span><span className="sub-node-name">Existing Clients</span><span className="sub-node-desc">Who uses this</span></div>
                <div className="sub-node"><span className="sub-node-icon">📖</span><span className="sub-node-name">System Map</span><span className="sub-node-desc">From Agent 01</span></div>
                <div className="sub-node-group-label">Created by this Agent</div>
                <div className="sub-node"><span className="sub-node-icon">✏️</span><span className="sub-node-name">Detailed Blueprint</span><span className="sub-node-desc">What to build</span></div>
                <div className="sub-node"><span className="sub-node-icon">✏️</span><span className="sub-node-name">Open Questions</span><span className="sub-node-desc">Things it doesn&apos;t know</span></div>
                <div className="sub-node"><span className="sub-node-icon">✏️</span><span className="sub-node-name">Corrections</span><span className="sub-node-desc">Blueprint updates</span></div>
              </div>
            </div>

            <div className="h-connector"><div className="h-connector-line"><div className="particle cyan" style={{ animationDelay: '0.3s' }}></div></div></div>

            <div className="agent-node">
              <div className="agent-card purple">
                <div className="agent-number">AGENT 03</div>
                <div className="agent-title"><span className="orb purple"></span> Question Resolver</div>
                <div className="agent-purpose">Acts as a smart filter. Tries to find answers to open questions by looking at all past company projects before bothering a human manager.</div>
                <div className="agent-meta">
                  <span className="tag tag-purple">Triggered: By Analyst</span>
                  <span className="tag tag-dim">Planning Only</span>
                </div>
              </div>
              <div className="sub-nodes">
                <div className="sub-node-group-label">Information Reviewed</div>
                <div className="sub-node"><span className="sub-node-icon">📖</span><span className="sub-node-name">Past Project Plans</span><span className="sub-node-desc">How we did it before</span></div>
                <div className="sub-node"><span className="sub-node-icon">📖</span><span className="sub-node-name">Team Decisions</span><span className="sub-node-desc">Architecture rules</span></div>
                <div className="sub-node"><span className="sub-node-icon">📖</span><span className="sub-node-name">Platform Rules</span><span className="sub-node-desc">Code standards</span></div>
                <div className="sub-node"><span className="sub-node-icon">📖</span><span className="sub-node-name">Current Setup</span><span className="sub-node-desc">What servers are running</span></div>
                <div className="sub-node-group-label">Created by this Agent</div>
                <div className="sub-node"><span className="sub-node-icon">✏️</span><span className="sub-node-name">Answered Questions</span><span className="sub-node-desc">✅ Resolved status</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="connector reveal"><div className="connector-line"><div className="particle purple" style={{ animationDelay: '0.1s' }}></div></div></div>
      <div className="gate reveal">
        <span className="gate-line-l"></span>
        <span className="gate-badge human"><span className="gate-icon">🧑</span> HUMAN GATE — Project Blueprint Approved + All Questions Answered</span>
        <span className="gate-line-r"></span>
      </div>
      <div className="connector reveal"><div className="connector-line"><div className="particle green" style={{ animationDelay: '0.2s' }}></div></div></div>

      {/* PHASE 2 */}
      <div className="lane reveal">
        <div className="lane-header">
          <span className="lane-badge green"><span className="badge-text">Phase 2</span></span>
          <span className="lane-desc">Building &amp; Testing</span>
          <span className="lane-line"></span>
        </div>
        <div className="lane-body">
          <div className="lane-agents">
            <div className="agent-node">
              <div className="agent-card green">
                <div className="agent-number">AGENT 04</div>
                <div className="agent-title"><span className="orb green"></span> The Code Builder</div>
                <div className="agent-purpose">Writes the actual software code and sets up the technical foundation based strictly on the approved project blueprint.</div>
                <div className="agent-meta">
                  <span className="tag tag-green">Triggered: Blueprint Approved</span>
                  <span className="tag tag-dim">Up to 5 attempts to fix errors</span>
                </div>
              </div>
              <div className="sub-nodes">
                <div className="sub-node-group-label">Information Reviewed</div>
                <div className="sub-node"><span className="sub-node-icon">📖</span><span className="sub-node-name">Past Mistakes Log</span><span className="sub-node-desc">Tricky edge cases</span></div>
                <div className="sub-node"><span className="sub-node-icon">📖</span><span className="sub-node-name">Detailed Blueprint</span><span className="sub-node-desc">What to build</span></div>
                <div className="sub-node"><span className="sub-node-icon">📖</span><span className="sub-node-name">Answered Questions</span><span className="sub-node-desc">Must be ✅ Resolved</span></div>
                <div className="sub-node"><span className="sub-node-icon">📖</span><span className="sub-node-name">Ownership Map</span><span className="sub-node-desc">Ensures it doesn&apos;t break other areas</span></div>
                <div className="sub-node-group-label">Created by this Agent</div>
                <div className="sub-node"><span className="sub-node-icon">✏️</span><span className="sub-node-name">Implementation Plan</span><span className="sub-node-desc">Step-by-step checklist</span></div>
                <div className="sub-node"><span className="sub-node-icon">✏️</span><span className="sub-node-name">Code Files</span><span className="sub-node-desc">The actual software</span></div>
                <div className="sub-node"><span className="sub-node-icon">✏️</span><span className="sub-node-name">Server Settings</span><span className="sub-node-desc">How to run the code</span></div>
                <div className="sub-node"><span className="sub-node-icon">✏️</span><span className="sub-node-name">Work Summary</span><span className="sub-node-desc">What was just built</span></div>
              </div>
            </div>

            <div className="h-connector"><div className="h-connector-line"><div className="particle green" style={{ animationDelay: '0.15s' }}></div></div></div>

            <div className="agent-node">
              <div className="agent-card green">
                <div className="agent-number">AGENT 05</div>
                <div className="agent-title"><span className="orb green"></span> Quality Tester</div>
                <div className="agent-purpose">Creates practice scenarios and writes automated tests to rigorously check the new code. Ensures the code works perfectly even in unusual situations.</div>
                <div className="agent-meta">
                  <span className="tag tag-green">Triggered: Builder Finishes</span>
                  <span className="tag tag-dim">Up to 4 attempts to fix tests</span>
                </div>
              </div>
              <div className="sub-nodes">
                <div className="sub-node-group-label">Information Reviewed</div>
                <div className="sub-node"><span className="sub-node-icon">📖</span><span className="sub-node-name">Edge Case Scenarios</span><span className="sub-node-desc">From blueprint</span></div>
                <div className="sub-node"><span className="sub-node-icon">📖</span><span className="sub-node-name">Code Files</span><span className="sub-node-desc">The new software to check</span></div>
                <div className="sub-node-group-label">Created by this Agent</div>
                <div className="sub-node"><span className="sub-node-icon">✏️</span><span className="sub-node-name">Test Data Scenarios</span><span className="sub-node-desc">Simulated inputs</span></div>
                <div className="sub-node"><span className="sub-node-icon">✏️</span><span className="sub-node-name">Automated Tests</span><span className="sub-node-desc">Scripts that check the code</span></div>
                <div className="sub-node"><span className="sub-node-icon">✏️</span><span className="sub-node-name">Sandbox Tests</span><span className="sub-node-desc">Tests in a safe environment</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="connector reveal"><div className="connector-line"><div className="particle green" style={{ animationDelay: '0.3s' }}></div></div></div>
      <div className="gate reveal">
        <span className="gate-line-l"></span>
        <span className="gate-badge hard"><span className="gate-icon">🔒</span> HARD GATE — Code has zero syntax errors AND tests prove it works flawlessly</span>
        <span className="gate-line-r"></span>
      </div>
      <div className="connector reveal"><div className="connector-line"><div className="particle red" style={{ animationDelay: '0.15s' }}></div></div></div>

      {/* PHASE 3 */}
      <div className="lane reveal">
        <div className="lane-header">
          <span className="lane-badge red"><span className="badge-text">Phase 3</span></span>
          <span className="lane-desc">Security &amp; Quality Review</span>
          <span className="lane-line"></span>
        </div>
        <div className="lane-body">
          <div className="lane-agents">
            <div className="agent-node">
              <div className="agent-card red">
                <div className="agent-number">AGENT 06</div>
                <div className="agent-title"><span className="orb red"></span> Security &amp; Compliance Reviewer</div>
                <div className="agent-purpose">Acts as an independent auditor. Makes sure no sensitive customer data is exposed, no unnecessary security permissions were granted, and the initial blueprint was perfectly followed.</div>
                <div className="agent-meta">
                  <span className="tag tag-red">Triggered: Tests Pass</span>
                  <span className="tag tag-dim">Keeps reviewing until perfect</span>
                </div>
              </div>
              <div className="sub-nodes">
                <div className="sub-node-group-label">Information Reviewed</div>
                <div className="sub-node"><span className="sub-node-icon">📖</span><span className="sub-node-name">Company Rulebook</span><span className="sub-node-desc">Security standards</span></div>
                <div className="sub-node"><span className="sub-node-icon">📖</span><span className="sub-node-name">Detailed Blueprint</span><span className="sub-node-desc">What was promised</span></div>
                <div className="sub-node"><span className="sub-node-icon">📖</span><span className="sub-node-name">Code Changes</span><span className="sub-node-desc">Line-by-line check of new code</span></div>
                <div className="sub-node-group-label">Created by this Agent</div>
                <div className="sub-node"><span className="sub-node-icon">✏️</span><span className="sub-node-name">Final Audit Report</span><span className="sub-node-desc">✅ Approved or 🔴 Blocked</span></div>
              </div>
            </div>

            <div className="agent-node">
              <div style={{ background: 'var(--surface)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '12px', padding: '16px' }}>
                <div style={{ fontFamily: '"Space Mono", monospace', fontSize: '13px', color: 'var(--red)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '10px' }}>Security Checklist</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div className="sub-node" style={{ borderColor: 'rgba(239,68,68,0.3)' }}><span className="sub-node-icon">🔍</span><span className="sub-node-name">Data Privacy Checks</span><span className="sub-node-desc">No passwords or emails leaked</span></div>
                  <div className="sub-node" style={{ borderColor: 'rgba(239,68,68,0.3)' }}><span className="sub-node-icon">🔍</span><span className="sub-node-name">Strict Permissions</span><span className="sub-node-desc">Only access what is needed</span></div>
                  <div className="sub-node" style={{ borderColor: 'rgba(239,68,68,0.3)' }}><span className="sub-node-icon">🔍</span><span className="sub-node-name">Quality Rules Followed</span><span className="sub-node-desc">Code is neat and clean</span></div>
                  <div className="sub-node" style={{ borderColor: 'rgba(239,68,68,0.3)' }}><span className="sub-node-icon">🔍</span><span className="sub-node-name">Matches the Plan</span><span className="sub-node-desc">No surprise &quot;extra&quot; features</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="connector reveal"><div className="connector-line"><div className="particle red" style={{ animationDelay: '0.1s' }}></div></div></div>
      <div className="gate reveal">
        <span className="gate-line-l"></span>
        <span className="gate-badge hard"><span className="gate-icon">🔒</span> HARD GATE — Audit approved, ready to be prepared for the live system</span>
        <span className="gate-line-r"></span>
      </div>
      <div className="connector reveal"><div className="connector-line"><div className="particle amber" style={{ animationDelay: '0.2s' }}></div></div></div>

      {/* PHASE 4 */}
      <div className="lane reveal">
        <div className="lane-header">
          <span className="lane-badge amber"><span className="badge-text">Phase 4</span></span>
          <span className="lane-desc">Launch Preparation &amp; Live Checks</span>
          <span className="lane-line"></span>
        </div>
        <div className="lane-body">
          <div className="lane-agents">
            <div className="agent-node">
              <div className="agent-card amber">
                <div className="agent-number">AGENT 07</div>
                <div className="agent-title"><span className="orb amber"></span> Deployment Manager</div>
                <div className="agent-purpose">Orchestrates the entire launch process. Carefully moves code into a practice environment, waits for a human go-ahead, and then flips the switch to go live.</div>
                <div className="agent-meta">
                  <span className="tag tag-amber">Triggered: Clean Audit</span>
                  <span className="tag tag-dim">Launch Director</span>
                </div>
              </div>
              <div className="sub-nodes">
                <div className="sub-node-group-label">Information Reviewed</div>
                <div className="sub-node"><span className="sub-node-icon">📖</span><span className="sub-node-name">System Status Notes</span><span className="sub-node-desc">Current live version</span></div>
                <div className="sub-node"><span className="sub-node-icon">📖</span><span className="sub-node-name">Testing Stamp</span><span className="sub-node-desc">Confirms Tester finished</span></div>
                <div className="sub-node"><span className="sub-node-icon">📖</span><span className="sub-node-name">Approval Dates</span><span className="sub-node-desc">Confirms human signed off</span></div>
                <div className="sub-node-group-label">Created by this Agent</div>
                <div className="sub-node"><span className="sub-node-icon">✏️</span><span className="sub-node-name">Update Records</span><span className="sub-node-desc">New version number</span></div>
                <div className="sub-node"><span className="sub-node-icon">✏️</span><span className="sub-node-name">Practice Launch</span><span className="sub-node-desc">Puts code in safe mode</span></div>
                <div className="sub-node"><span className="sub-node-icon">✏️</span><span className="sub-node-name">Live Launch</span><span className="sub-node-desc">Puts code in front of real users</span></div>
              </div>
            </div>

            <div className="h-connector"><div className="h-connector-line"><div className="particle amber" style={{ animationDelay: '0.1s' }}></div></div></div>

            <div className="agent-node">
              <div className="agent-card amber">
                <div className="agent-number">AGENT 08</div>
                <div className="agent-title"><span className="orb amber"></span> Live Environment Checker</div>
                <div className="agent-purpose">Runs a 6-step systematic check once the code is in the practice launch environment. It pretends to be a user to make absolutely sure the system didn&apos;t break.</div>
                <div className="agent-meta">
                  <span className="tag tag-amber">Triggered: By Deploy Manager</span>
                  <span className="tag tag-dim">Up to 3 retries max</span>
                </div>
              </div>
              <div className="sub-nodes">
                <div className="sub-node-group-label">Information Reviewed</div>
                <div className="sub-node"><span className="sub-node-icon">📖</span><span className="sub-node-name">Expected Outcomes</span><span className="sub-node-desc">What should happen</span></div>
                <div className="sub-node"><span className="sub-node-icon">📖</span><span className="sub-node-name">Test Scenarios</span><span className="sub-node-desc">Mock user data</span></div>
                <div className="sub-node"><span className="sub-node-icon">📖</span><span className="sub-node-name">System Monitors</span><span className="sub-node-desc">Error trackers</span></div>
                <div className="sub-node-group-label">Created by this Agent</div>
                <div className="sub-node"><span className="sub-node-icon">✏️</span><span className="sub-node-name">System Health Report</span><span className="sub-node-desc">PASS or FAIL</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="connector reveal"><div className="connector-line"><div className="particle amber" style={{ animationDelay: '0.15s' }}></div></div></div>
      <div className="gate reveal">
        <span className="gate-line-l"></span>
        <span className="gate-badge human"><span className="gate-icon">🧑</span> HUMAN GATE — Press Button: &quot;Promote to Live Environment&quot;</span>
        <span className="gate-line-r"></span>
      </div>
      <div className="connector reveal"><div className="connector-line"><div className="particle green" style={{ animationDelay: '0.25s' }}></div></div></div>
      <div className="gate reveal">
        <span className="gate-line-l"></span>
        <span className="gate-badge hard"><span className="gate-icon">🔒</span> HARD GATE — Code is exactly what was tested + Health Report passed + Human confirmed</span>
        <span className="gate-line-r"></span>
      </div>
      <div className="connector reveal"><div className="connector-line"><div className="particle green" style={{ animationDelay: '0.1s' }}></div></div></div>
      <div className="gate reveal">
        <span className="gate-line-l"></span>
        <span className="gate-badge human"><span className="gate-icon">🧑</span> HUMAN GATE — Monitor Live System: &quot;No errors, we are good&quot;</span>
        <span className="gate-line-r"></span>
      </div>
      <div className="connector reveal"><div className="connector-line"><div className="particle cyan" style={{ animationDelay: '0.2s' }}></div></div></div>

      {/* PHASE 5 */}
      <div className="lane reveal">
        <div className="lane-header">
          <span className="lane-badge cyan"><span className="badge-text">Phase 5</span></span>
          <span className="lane-desc">Wrap-up &amp; Reporting</span>
          <span className="lane-line"></span>
        </div>
        <div className="lane-body">
          <div className="lane-agents">
            <div className="agent-node">
              <div className="agent-card cyan">
                <div className="agent-number">AGENT 09</div>
                <div className="agent-title"><span className="orb cyan"></span> Manuals &amp; Docs Updater</div>
                <div className="agent-purpose">Updates all internal company manuals and living documents to perfectly match the new changes. It appends information so we never lose historical data.</div>
                <div className="agent-meta">
                  <span className="tag tag-cyan">Triggered: Live Launch Done</span>
                  <span className="tag tag-dim">Paperwork Only</span>
                </div>
              </div>
              <div className="sub-nodes">
                <div className="sub-node-group-label">Documents Updated</div>
                <div className="sub-node"><span className="sub-node-icon">✏️</span><span className="sub-node-name">System Map</span><span className="sub-node-desc">Current layout updated</span></div>
                <div className="sub-node"><span className="sub-node-icon">✏️</span><span className="sub-node-name">Server Setup</span><span className="sub-node-desc">Where things live now</span></div>
                <div className="sub-node"><span className="sub-node-icon">✏️</span><span className="sub-node-name">Ownership Log</span><span className="sub-node-desc">Who handles what</span></div>
                <div className="sub-node"><span className="sub-node-icon">✏️</span><span className="sub-node-name">To-Do List</span><span className="sub-node-desc">Marks this task as &quot;Done&quot;</span></div>
                <div className="sub-node"><span className="sub-node-icon">✏️</span><span className="sub-node-name">Speed Metrics</span><span className="sub-node-desc">Records how fast the app is</span></div>
              </div>
            </div>

            <div className="h-connector"><div className="h-connector-line"><div className="particle cyan" style={{ animationDelay: '0.1s' }}></div></div></div>

            <div className="agent-node">
              <div className="agent-card blue">
                <div className="agent-number">AGENT 10</div>
                <div className="agent-title"><span className="orb blue"></span> Overall System Auditor</div>
                <div className="agent-purpose">Independent reviewer. Instead of checking a specific task, it looks at the whole company&apos;s system to find big-picture problems, inefficiencies, or risks.</div>
                <div className="agent-meta">
                  <span className="tag tag-blue">Triggered: Live Launch Done</span>
                  <span className="tag tag-dim">Full System Check</span>
                </div>
              </div>
              <div className="sub-nodes">
                <div className="sub-node-group-label">Information Reviewed</div>
                <div className="sub-node"><span className="sub-node-icon">📖</span><span className="sub-node-name">All Team Rules</span><span className="sub-node-desc">Looking for blindspots</span></div>
                <div className="sub-node"><span className="sub-node-icon">📖</span><span className="sub-node-name">All Shared Tooling</span><span className="sub-node-desc">Looking for messy code</span></div>
                <div className="sub-node"><span className="sub-node-icon">📖</span><span className="sub-node-name">Error Patterns</span><span className="sub-node-desc">Why do things fail?</span></div>
                <div className="sub-node-group-label">Created by this Agent</div>
                <div className="sub-node"><span className="sub-node-icon">✏️</span><span className="sub-node-name">System Advice Report</span><span className="sub-node-desc">🔴/🟡/🟢 Findings</span></div>
              </div>
            </div>

            <div className="h-connector"><div className="h-connector-line"><div className="particle blue" style={{ animationDelay: '0.2s' }}></div></div></div>

            <div className="agent-node">
              <div className="agent-card purple">
                <div className="agent-number">AGENT 11</div>
                <div className="agent-title"><span className="orb purple"></span> Release Reporter</div>
                <div className="agent-purpose">The final step. Writes a simple, easy-to-read summary of what was just released. It writes three versions: one for clients, one for managers, and one for tech teams.</div>
                <div className="agent-meta">
                  <span className="tag tag-purple">Triggered: Live Launch Done</span>
                  <span className="tag tag-dim">Final Communication</span>
                </div>
              </div>
              <div className="sub-nodes">
                <div className="sub-node-group-label">Information Reviewed</div>
                <div className="sub-node"><span className="sub-node-icon">📖</span><span className="sub-node-name">Work Summary</span><span className="sub-node-desc">What was actually built</span></div>
                <div className="sub-node"><span className="sub-node-icon">📖</span><span className="sub-node-name">Detailed Blueprint</span><span className="sub-node-desc">What was promised</span></div>
                <div className="sub-node"><span className="sub-node-icon">📖</span><span className="sub-node-name">Health Reports</span><span className="sub-node-desc">System performance</span></div>
                <div className="sub-node-group-label">Created by this Agent</div>
                <div className="sub-node"><span className="sub-node-icon">✏️</span><span className="sub-node-name">Release Announcements</span><span className="sub-node-desc">Client/Manager/Tech versions</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="connector reveal"><div className="connector-line" style={{ height: '16px' }}></div></div>

      {/* BACKGROUND OPERATIONS */}
      <div className="lane reveal">
        <div className="lane-header">
          <span className="lane-badge orange"><span className="badge-text">Ongoing</span></span>
          <span className="lane-desc">Ongoing Operations — Works Independently of the Main Flow</span>
          <span className="lane-line"></span>
        </div>
        <div className="lane-body" style={{ borderColor: 'rgba(249,115,22,0.2)' }}>
          <div className="lane-agents">
            <div className="agent-node lg:max-w-[480px]">
              <div className="agent-card orange">
                <div className="agent-number">AGENT 12</div>
                <div className="agent-title"><span className="orb orange"></span> The Incident Responder</div>
                <div className="agent-purpose">Monitors the live system 24/7. If an error alert rings, it investigates the issue, tries simple safe fixes automatically, and alerts a human team if something actually broke.</div>
                <div className="agent-meta">
                  <span className="tag tag-orange">Triggered: System Error Alarm</span>
                  <span className="tag tag-dim">Never fixes repeatedly without a human</span>
                </div>
              </div>
              <div className="sub-nodes">
                <div className="sub-node-group-label">Information Reviewed</div>
                <div className="sub-node"><span className="sub-node-icon">📖</span><span className="sub-node-name">Error Logs</span><span className="sub-node-desc">The digital evidence</span></div>
                <div className="sub-node"><span className="sub-node-icon">📖</span><span className="sub-node-name">Failed Actions</span><span className="sub-node-desc">What the user was doing</span></div>
                <div className="sub-node"><span className="sub-node-icon">📖</span><span className="sub-node-name">Server History</span><span className="sub-node-desc">Recent changes</span></div>
                <div className="sub-node-group-label">Created by this Agent</div>
                <div className="sub-node"><span className="sub-node-icon">✏️</span><span className="sub-node-name">Action Retry</span><span className="sub-node-desc">If it was a temporary glitch</span></div>
                <div className="sub-node"><span className="sub-node-icon">✏️</span><span className="sub-node-name">Bug Report</span><span className="sub-node-desc">For humans to fix later</span></div>
                <div className="sub-node"><span className="sub-node-icon">✏️</span><span className="sub-node-name">Chat Notification</span><span className="sub-node-desc">Alerts the human team</span></div>
              </div>
            </div>

            <div className="agent-node lg:max-w-[340px]">
              <div style={{ background: 'var(--surface)', border: '1px solid rgba(249,115,22,0.3)', borderRadius: '12px', padding: '16px' }}>
                <div style={{ fontFamily: '"Space Mono", monospace', fontSize: '13px', color: 'var(--orange)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '10px' }}>Emergency Safety Rules</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div className="sub-node" style={{ borderColor: 'rgba(249,115,22,0.3)' }}><span className="sub-node-icon">⛔</span><span className="sub-node-name">Stop after 3 retries</span><span className="sub-node-desc">Ask a human for help</span></div>
                  <div className="sub-node" style={{ borderColor: 'rgba(249,115,22,0.3)' }}><span className="sub-node-icon">⛔</span><span className="sub-node-name">Never deploy code</span><span className="sub-node-desc">Only diagnose, don&apos;t build</span></div>
                  <div className="sub-node" style={{ borderColor: 'rgba(249,115,22,0.3)' }}><span className="sub-node-icon">⛔</span><span className="sub-node-name">Don&apos;t hide errors</span><span className="sub-node-desc">A human must close the ticket</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ height: '24px' }}></div>

      {/* FOUNDATION */}
      <div className="lane reveal">
        <div className="lane-header">
          <span className="lane-badge green"><span className="badge-text">Core</span></span>
          <span className="lane-desc">Shared Toolbelt — Pre-built resources used by all Agents</span>
          <span className="lane-line"></span>
        </div>
        <div className="lane-body">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
            <div>
              <div style={{ fontFamily: '"Space Mono", monospace', fontSize: '13px', color: 'var(--accent4)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '10px' }}>Core Toolbelt</div>
              <div className="infra-grid">
                <div className="infra-node green">
                  <div className="infra-node-title">Activity Tracker</div>
                  <div className="infra-node-desc">Logs actions but automatically hides private customer data</div>
                </div>
                <div className="infra-node green">
                  <div className="infra-node-title">Secure Vault</div>
                  <div className="infra-node-desc">Safely retrieves passwords and secret keys when needed</div>
                </div>
                <div className="infra-node green">
                  <div className="infra-node-title">Duplicate Preventer</div>
                  <div className="infra-node-desc">Makes sure we don&apos;t accidentally charge a customer twice</div>
                </div>
                <div className="infra-node green">
                  <div className="infra-node-title">Security Bouncer</div>
                  <div className="infra-node-desc">Verifies that incoming data is actually from a trusted source</div>
                </div>
                <div className="infra-node green">
                  <div className="infra-node-title">Retry Logic</div>
                  <div className="infra-node-desc">If a connection drops, it waits a moment and tries again gently</div>
                </div>
                <div className="infra-node cyan">
                  <div className="infra-node-title">Shared Language</div>
                  <div className="infra-node-desc">Common definitions so all agents use the same vocabulary</div>
                </div>
              </div>
            </div>
            <div>
              <div style={{ fontFamily: '"Space Mono", monospace', fontSize: '13px', color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '10px' }}>External Connections</div>
              <div className="infra-grid">
                <div className="infra-node blue">
                  <div className="infra-node-title">Storefront Link</div>
                  <div className="infra-node-desc">Talks to the online store to get order and customer info</div>
                </div>
                <div className="infra-node blue">
                  <div className="infra-node-title">Subscription Link</div>
                  <div className="infra-node-desc">Talks to the billing system to manage recurring payments</div>
                </div>
                <div className="infra-node amber">
                  <div className="infra-node-title">Payment Gateway</div>
                  <div className="infra-node-desc">Currently paused — waiting on a partner approval to finish</div>
                </div>
              </div>

              <div style={{ fontFamily: '"Space Mono", monospace', fontSize: '13px', color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase', margin: '14px 0 10px' }}>Team Knowledge Base</div>
              <div className="infra-grid">
                <div className="infra-node cyan">
                  <div className="infra-node-title">Team Brain</div>
                  <div className="infra-node-desc">A log of past mistakes so agents never make the same error twice</div>
                </div>
                <div className="infra-node cyan">
                  <div className="infra-node-title">Ownership Map</div>
                  <div className="infra-node-desc">Tracks what areas of the app interact with each other</div>
                </div>
                <div className="infra-node cyan">
                  <div className="infra-node-title">Failure Patterns</div>
                  <div className="infra-node-desc">A study of what usually breaks, to help us write better plans</div>
                </div>
                <div className="infra-node cyan">
                  <div className="infra-node-title">Speed Baseline</div>
                  <div className="infra-node-desc">Metrics to ensure new features don&apos;t slow down the software</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ height: '16px' }}></div>

      {/* AUTOMATION */}
      <div className="lane reveal">
        <div className="lane-header">
          <span className="lane-badge purple"><span className="badge-text">Auto</span></span>
          <span className="lane-desc">Background Robot Checkers — Automatic Quality Control</span>
          <span className="lane-line"></span>
        </div>
        <div className="lane-body" style={{ padding: '0' }}>
          <div className="cicd-flow">
            <div className="cicd-step">
              <div className="cicd-label">1. Code Scan</div>
              <div className="cicd-desc">Checks for typos, formatting errors, and broken logic</div>
              <div className="cicd-trigger">Happens every time code is written</div>
            </div>
            <div className="cicd-step">
              <div className="cicd-label">2. Run Practice Scenarios</div>
              <div className="cicd-desc">Runs automated tests. If code drops below 80% coverage, it&apos;s rejected</div>
              <div className="cicd-trigger">Before any manager review</div>
            </div>
            <div className="cicd-step">
              <div className="cicd-label">3. Practice Environment Launch</div>
              <div className="cicd-desc">Automatically places approved code into a safe, hidden live space</div>
              <div className="cicd-trigger">After manager approves code</div>
            </div>
            <div className="cicd-step">
              <div className="cicd-label">4. Final Sandbox Tests</div>
              <div className="cicd-desc">Runs tests against the safe environment to mimic real user actions</div>
              <div className="cicd-trigger">After Practice Launch finishes</div>
            </div>
            <div className="cicd-step">
              <div className="cicd-label">5. Alert the Humans</div>
              <div className="cicd-desc">Sends a chat message to the team if ANY of these steps fail</div>
              <div className="cicd-trigger">If a problem is found</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ height: '16px' }}></div>

      {/* SAFETY NET */}
      <div className="lane reveal">
        <div className="lane-header">
          <span className="lane-badge red"><span className="badge-text">Safety</span></span>
          <span className="lane-desc">8 Strict Checkpoints + Failure Limits — Agents Cannot Bypass Rules</span>
          <span className="lane-line"></span>
        </div>
        <div className="lane-body">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
            <div>
              <div style={{ fontFamily: '"Space Mono", monospace', fontSize: '13px', color: 'var(--red)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '10px' }}>Mandatory Checkpoints</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div className="sub-node" style={{ borderColor: 'rgba(239,68,68,0.3)' }}><span className="sub-node-icon" style={{ color: 'var(--red)' }}>①</span><span className="sub-node-name">All open questions answered</span><span className="sub-node-desc">Before starting</span></div>
                <div className="sub-node" style={{ borderColor: 'rgba(239,68,68,0.3)' }}><span className="sub-node-icon" style={{ color: 'var(--red)' }}>②</span><span className="sub-node-name">Manager signed the Blueprint</span><span className="sub-node-desc">Before coding</span></div>
                <div className="sub-node" style={{ borderColor: 'rgba(239,68,68,0.3)' }}><span className="sub-node-icon" style={{ color: 'var(--red)' }}>③</span><span className="sub-node-name">Zero code spelling mistakes</span><span className="sub-node-desc">Before testing</span></div>
                <div className="sub-node" style={{ borderColor: 'rgba(239,68,68,0.3)' }}><span className="sub-node-icon" style={{ color: 'var(--red)' }}>④</span><span className="sub-node-name">No private data exposed</span><span className="sub-node-desc">Security Audit</span></div>
                <div className="sub-node" style={{ borderColor: 'rgba(239,68,68,0.3)' }}><span className="sub-node-icon" style={{ color: 'var(--red)' }}>⑤</span><span className="sub-node-name">Code proves it passed tests</span><span className="sub-node-desc">Before launching</span></div>
                <div className="sub-node" style={{ borderColor: 'rgba(239,68,68,0.3)' }}><span className="sub-node-icon" style={{ color: 'var(--red)' }}>⑥</span><span className="sub-node-name">Exact version match</span><span className="sub-node-desc">Ensures no sneaky edits</span></div>
                <div className="sub-node" style={{ borderColor: 'rgba(239,68,68,0.3)' }}><span className="sub-node-icon" style={{ color: 'var(--red)' }}>⑦</span><span className="sub-node-name">Human says &quot;Go Live&quot;</span><span className="sub-node-desc">Final launch button</span></div>
                <div className="sub-node" style={{ borderColor: 'rgba(239,68,68,0.3)' }}><span className="sub-node-icon" style={{ color: 'var(--red)' }}>⑧</span><span className="sub-node-name">No more than 3 error retries</span><span className="sub-node-desc">If something breaks later</span></div>
              </div>
            </div>
            <div>
              <div style={{ fontFamily: '"Space Mono", monospace', fontSize: '13px', color: 'var(--accent5)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '10px' }}>Built-in Frustration Limits</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div className="sub-node" style={{ borderColor: 'rgba(245,158,11,0.3)' }}><span className="sub-node-icon" style={{ color: 'var(--accent5)' }}>5×</span><span className="sub-node-name">Coding error limits</span><span className="sub-node-desc">If stuck → ask human</span></div>
                <div className="sub-node" style={{ borderColor: 'rgba(245,158,11,0.3)' }}><span className="sub-node-icon" style={{ color: 'var(--accent5)' }}>4×</span><span className="sub-node-name">Test failure limits</span><span className="sub-node-desc">If stuck → ask human</span></div>
                <div className="sub-node" style={{ borderColor: 'rgba(245,158,11,0.3)' }}><span className="sub-node-icon" style={{ color: 'var(--accent5)' }}>3×</span><span className="sub-node-name">Practice check failures</span><span className="sub-node-desc">If stuck → ask human</span></div>
                <div className="sub-node" style={{ borderColor: 'rgba(245,158,11,0.3)' }}><span className="sub-node-icon" style={{ color: 'var(--accent5)' }}>3×</span><span className="sub-node-name">Blueprint revision loops</span><span className="sub-node-desc">If stuck → ask human</span></div>
                <div className="sub-node" style={{ borderColor: 'rgba(245,158,11,0.3)' }}><span className="sub-node-icon" style={{ color: 'var(--accent5)' }}>3×</span><span className="sub-node-name">External tool surprises</span><span className="sub-node-desc">If stuck → ask human</span></div>
              </div>
              <div style={{ fontFamily: '"Space Mono", monospace', fontSize: '13px', color: 'var(--muted)', letterSpacing: '0.08em', marginTop: '14px', lineHeight: '1.6' }}>
                Before an agent is allowed to try fixing a problem again, it must write down its thought process. If an agent tries the exact same broken fix twice, it only counts as one attempt.
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
