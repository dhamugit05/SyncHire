import React, { useState } from 'react';
import { 
  Building2, 
  CheckCircle2, 
  Clock, 
  Video, 
  Globe, 
  ChevronLeft, 
  ChevronRight, 
  ShieldCheck, 
  Calendar as CalendarIcon, 
  Sparkles, 
  Check, 
  ChevronDown, 
  Smartphone, 
  Mail, 
  Zap, 
  Lock,
  Download
} from 'lucide-react';

interface CandidatePortalViewProps {
  onBookingConfirmed?: (details: any) => void;
}

export const CandidatePortalView: React.FC<CandidatePortalViewProps> = ({
  onBookingConfirmed,
}) => {
  const [selectedDate, setSelectedDate] = useState('24');
  const [selectedSlotIndex, setSelectedSlotIndex] = useState(1); // Slot 2: 11:30 AM
  const [verificationMethod, setVerificationMethod] = useState<'otp' | 'magic'>('otp');
  const [otpDigits, setOtpDigits] = useState(['7', '4', '2', '9']);
  const [specialTopics, setSpecialTopics] = useState('');
  const [consentChecked, setConsentChecked] = useState(true);
  const [isBooked, setIsBooked] = useState(false);
  const [calendarSynced, setCalendarSynced] = useState<string | null>(null);

  const slots = [
    {
      time: '10:00 AM - 11:00 AM',
      tag: 'Optimal',
      sub: 'Panel Confirmed (2/2)',
      tagColor: 'emerald',
    },
    {
      time: '11:30 AM - 12:30 PM',
      tag: 'Best Panel Alignment',
      sub: 'Selected',
      tagColor: 'indigo',
    },
    {
      time: '02:00 PM - 03:00 PM',
      tag: 'Available',
      sub: 'Post-lunch sync',
      tagColor: 'emerald',
    },
    {
      time: '04:30 PM - 05:30 PM',
      tag: 'Filling Fast',
      sub: '1 other candidate eyeing',
      tagColor: 'amber',
    },
  ];

  const handleConfirm = () => {
    setIsBooked(true);
    if (onBookingConfirmed) {
      onBookingConfirmed({
        slot: slots[selectedSlotIndex].time,
        date: `Oct ${selectedDate}, 2024`,
      });
    }
  };

  const handleSyncCalendar = (provider: string) => {
    setCalendarSynced(provider);
    setTimeout(() => setCalendarSynced(null), 3000);
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-[#0b1326] overflow-y-auto">
      <div className="p-6 max-w-7xl mx-auto w-full space-y-6">
        {/* Top Header Card */}
        <div className="rounded-xl border border-white/[0.08] bg-gradient-to-r from-[#0f172a] via-[#131b2e] to-[#0f172a] p-5 shadow-lg relative overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="font-semibold text-[#dae2fd]">Acme Technologies</span>
                <span className="inline-flex items-center gap-1 rounded bg-[#00a572]/20 px-2 py-0.5 text-[10px] font-mono text-[#4edea3] border border-[#4edea3]/30">
                  <CheckCircle2 className="h-3 w-3" />
                  Verified Hiring Partner
                </span>
                <span className="rounded bg-[#222a3d] px-2 py-0.5 text-[10px] font-mono text-[#c3c0ff]">
                  SyncHire FastTrack™
                </span>
              </div>

              <h1 className="text-2xl font-bold text-white tracking-tight">
                Staff Full-Stack Engineer
              </h1>

              <div className="text-xs text-[#918fa1] flex items-center gap-2">
                <span>Stage:</span>
                <span className="font-semibold text-[#dae2fd]">Technical Deep Dive &amp; Architecture</span>
              </div>
            </div>

            <div className="flex items-center gap-2 rounded-full bg-[#00a572]/15 px-3 py-1 text-xs font-mono text-[#4edea3] border border-[#4edea3]/30">
              <span className="h-2 w-2 rounded-full bg-[#4edea3] animate-pulse" />
              <span>SESSION STATE: 1-Click Magic Link Active</span>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2 text-[#dae2fd]">
                <Clock className="h-4 w-4 text-[#c3c0ff]" />
                <div>
                  <div className="text-[10px] text-[#918fa1] uppercase font-mono">Duration</div>
                  <div className="font-semibold">60 Minutes</div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[#dae2fd]">
                <Video className="h-4 w-4 text-[#4edea3]" />
                <div>
                  <div className="text-[10px] text-[#918fa1] uppercase font-mono">Video Link</div>
                  <div className="font-semibold">Zoom (Instant Key)</div>
                </div>
              </div>
            </div>

            {/* Panel Members */}
            <div className="flex items-center gap-4">
              <span className="text-[10px] uppercase font-mono text-[#918fa1]">Your Interview Panel:</span>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 rounded bg-[#090d16]/70 px-2.5 py-1 border border-white/[0.06]">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
                    alt="David Kim"
                    className="h-6 w-6 rounded-full object-cover"
                  />
                  <div>
                    <div className="text-xs font-semibold text-[#dae2fd]">David Kim</div>
                    <div className="text-[9px] text-[#918fa1]">Principal Arch (Ex-Netflix)</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 rounded bg-[#090d16]/70 px-2.5 py-1 border border-white/[0.06]">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
                    alt="Elena Vance"
                    className="h-6 w-6 rounded-full object-cover"
                  />
                  <div>
                    <div className="text-xs font-semibold text-[#dae2fd]">Elena Vance</div>
                    <div className="text-[9px] text-[#918fa1]">Lead Talent Recruiter</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Success Confirmation Banner if booked */}
        {isBooked && (
          <div className="rounded-xl border border-[#4edea3]/40 bg-[#00a572]/15 p-5 text-[#dae2fd] shadow-lg animate-fadeIn">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-6 w-6 text-[#4edea3] shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h3 className="text-base font-bold text-white">Interview Confirmed &amp; Calendar Lock Activated!</h3>
                <p className="text-xs text-[#c7c4d8]">
                  Your Technical Deep Dive &amp; Architecture session is locked for <strong className="text-white">Thursday, Oct {selectedDate}, 2024 at {slots[selectedSlotIndex].time} EDT</strong>. A secure encrypted Zoom room link and calendar payload have been emailed to marcus.chen@devmail.com.
                </p>
                <div className="pt-2 flex items-center gap-3 text-xs font-mono">
                  <span className="text-[#4edea3]">● Host Room Room-ID: SYNC-9921-VIP</span>
                  <span className="text-[#c3c0ff]">● Encrypted Video Passcode: 884-219</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2-Column Booking Workflow */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* STEP 1: Select an Interview Slot (7 Cols) */}
          <div className="lg:col-span-7 rounded-xl border border-white/[0.08] bg-[#0f172a] p-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.06] pb-3">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#918fa1]">
                  STEP 1 OF 2
                </div>
                <h2 className="text-lg font-bold text-white">
                  Select an Interview Slot
                </h2>
              </div>

              {/* Timezone picker */}
              <div className="flex items-center gap-2 rounded border border-white/[0.08] bg-[#131b2e] px-2.5 py-1.5 text-xs text-[#dae2fd]">
                <Globe className="h-3.5 w-3.5 text-[#4edea3]" />
                <span className="text-[10px] text-[#918fa1]">Timezone (Auto-detected)</span>
                <span className="font-mono font-medium">America/New_York (EDT, GMT-4)</span>
                <ChevronDown className="h-3 w-3 text-[#918fa1]" />
              </div>
            </div>

            {/* Calendar Widget */}
            <div className="rounded-lg bg-[#131b2e] p-3.5 border border-white/[0.04]">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-xs text-[#dae2fd]">October • November 2024</span>
                  <span className="rounded bg-[#222a3d] px-2 py-0.5 text-[10px] font-mono text-[#c3c0ff]">
                    12 Open Windows
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <button className="h-6 w-6 rounded flex items-center justify-center text-[#918fa1] hover:bg-[#1e293b] hover:text-white">
                    <ChevronLeft className="h-3.5 w-3.5" />
                  </button>
                  <button className="h-6 w-6 rounded flex items-center justify-center text-[#918fa1] hover:bg-[#1e293b] hover:text-white">
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {/* Days header */}
              <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-mono text-[#918fa1] mb-1">
                <span>MON</span>
                <span>TUE</span>
                <span>WED</span>
                <span>THU</span>
                <span>FRI</span>
                <span>SAT</span>
                <span>SUN</span>
              </div>

              {/* Week 1 */}
              <div className="grid grid-cols-7 gap-1 text-center text-xs font-mono">
                <button className="p-2 rounded text-[#918fa1] opacity-40">21</button>
                <button className="p-2 rounded text-[#918fa1] opacity-40">22</button>
                <button
                  onClick={() => setSelectedDate('23')}
                  className={`p-2 rounded flex flex-col items-center justify-center relative ${
                    selectedDate === '23' ? 'bg-[#4f46e5] text-white font-bold' : 'text-[#dae2fd] hover:bg-[#1e293b]'
                  }`}
                >
                  <span>23</span>
                  <span className="h-1 w-1 rounded-full bg-[#4edea3] mt-0.5" />
                </button>
                <button
                  onClick={() => setSelectedDate('24')}
                  className={`p-2 rounded flex flex-col items-center justify-center relative ${
                    selectedDate === '24' ? 'bg-[#4f46e5] text-white font-bold ring-1 ring-white/20' : 'text-[#dae2fd] hover:bg-[#1e293b]'
                  }`}
                >
                  <span>24</span>
                  <span className="h-1 w-1 rounded-full bg-[#4edea3] mt-0.5" />
                </button>
                <button
                  onClick={() => setSelectedDate('25')}
                  className={`p-2 rounded flex flex-col items-center justify-center relative ${
                    selectedDate === '25' ? 'bg-[#4f46e5] text-white font-bold' : 'text-[#dae2fd] hover:bg-[#1e293b]'
                  }`}
                >
                  <span>25</span>
                  <span className="h-1 w-1 rounded-full bg-[#4edea3] mt-0.5" />
                </button>
                <button className="p-2 rounded text-[#918fa1] opacity-40">26</button>
                <button className="p-2 rounded text-[#918fa1] opacity-40">27</button>
              </div>

              {/* Week 2 */}
              <div className="grid grid-cols-7 gap-1 text-center text-xs font-mono mt-1">
                <button onClick={() => setSelectedDate('28')} className={`p-2 rounded flex flex-col items-center justify-center ${selectedDate === '28' ? 'bg-[#4f46e5] text-white font-bold' : 'text-[#dae2fd] hover:bg-[#1e293b]'}`}>
                  <span>28</span><span className="h-1 w-1 rounded-full bg-[#4edea3] mt-0.5" />
                </button>
                <button onClick={() => setSelectedDate('29')} className={`p-2 rounded flex flex-col items-center justify-center ${selectedDate === '29' ? 'bg-[#4f46e5] text-white font-bold' : 'text-[#dae2fd] hover:bg-[#1e293b]'}`}>
                  <span>29</span><span className="h-1 w-1 rounded-full bg-[#4edea3] mt-0.5" />
                </button>
                <button onClick={() => setSelectedDate('30')} className={`p-2 rounded flex flex-col items-center justify-center ${selectedDate === '30' ? 'bg-[#4f46e5] text-white font-bold' : 'text-[#dae2fd] hover:bg-[#1e293b]'}`}>
                  <span>30</span><span className="h-1 w-1 rounded-full bg-[#4edea3] mt-0.5" />
                </button>
                <button onClick={() => setSelectedDate('31')} className={`p-2 rounded flex flex-col items-center justify-center ${selectedDate === '31' ? 'bg-[#4f46e5] text-white font-bold' : 'text-[#dae2fd] hover:bg-[#1e293b]'}`}>
                  <span>31</span><span className="h-1 w-1 rounded-full bg-[#4edea3] mt-0.5" />
                </button>
                <button onClick={() => setSelectedDate('01')} className={`p-2 rounded flex flex-col items-center justify-center ${selectedDate === '01' ? 'bg-[#4f46e5] text-white font-bold' : 'text-[#dae2fd] hover:bg-[#1e293b]'}`}>
                  <span>01</span><span className="h-1 w-1 rounded-full bg-[#4edea3] mt-0.5" />
                </button>
                <button className="p-2 rounded text-[#918fa1] opacity-40">02</button>
                <button className="p-2 rounded text-[#918fa1] opacity-40">03</button>
              </div>
            </div>

            {/* Available Times Header */}
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[#dae2fd]">
                Available Times: <span className="text-white">Thursday, Oct {selectedDate}</span>
              </span>
              <span className="text-[11px] font-mono text-[#918fa1]">
                4 slots remaining
              </span>
            </div>

            {/* Time Slots List */}
            <div className="space-y-2.5">
              {slots.map((slot, idx) => {
                const isSelected = selectedSlotIndex === idx;
                return (
                  <div
                    key={slot.time}
                    onClick={() => setSelectedSlotIndex(idx)}
                    className={`rounded-lg p-3 border transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'bg-[#171f33] border-[#4f46e5] ring-1 ring-[#4f46e5]/40 shadow-xs'
                        : 'bg-[#131b2e] border-white/[0.06] hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`h-4 w-4 rounded-full border flex items-center justify-center ${
                        isSelected ? 'border-[#4f46e5] bg-[#4f46e5]' : 'border-white/30'
                      }`}>
                        {isSelected && <Check className="h-3 w-3 text-white" />}
                      </div>

                      <div>
                        <div className="font-mono text-xs font-bold text-[#dae2fd]">
                          {slot.time}
                        </div>
                        <div className="text-[10px] text-[#918fa1]">
                          {slot.sub}
                        </div>
                      </div>
                    </div>

                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                      slot.tagColor === 'indigo'
                        ? 'bg-[#4f46e5] text-white font-bold'
                        : slot.tagColor === 'amber'
                        ? 'bg-[#885500]/30 text-[#ffb95f] border border-[#ffb95f]/30'
                        : 'bg-[#00a572]/20 text-[#4edea3] border border-[#4edea3]/30'
                    }`}>
                      {slot.tag}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Timezone Drift Visualizer */}
            <div className="rounded-lg border border-white/[0.08] bg-[#090d16] p-3 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="flex items-center gap-1.5 text-[#918fa1]">
                  <Globe className="h-3.5 w-3.5 text-[#4edea3]" />
                  <span>Timezone Drift Visualizer</span>
                </span>
                <span className="text-[#dae2fd]">
                  Selected Slot: <strong className="text-white">{slots[selectedSlotIndex].time.split(' - ')[0]} EDT</strong>
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
                <div className="rounded bg-[#131b2e] p-2 border border-white/[0.04]">
                  <div className="text-[9px] uppercase text-[#918fa1]">Candidate (You)</div>
                  <div className="font-bold text-[#4edea3] mt-0.5">
                    {slots[selectedSlotIndex].time.split(' - ')[0]} EDT
                  </div>
                </div>

                <div className="rounded bg-[#131b2e] p-2 border border-white/[0.04]">
                  <div className="text-[9px] uppercase text-[#918fa1]">David Kim (SF)</div>
                  <div className="font-bold text-[#dae2fd] mt-0.5">
                    08:30 AM PDT
                  </div>
                </div>

                <div className="rounded bg-[#131b2e] p-2 border border-white/[0.04]">
                  <div className="text-[9px] uppercase text-[#918fa1]">Elena Vance (NY)</div>
                  <div className="font-bold text-[#dae2fd] mt-0.5">
                    {slots[selectedSlotIndex].time.split(' - ')[0]} EDT
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* STEP 2: Confirm Your Booking (5 Cols) */}
          <div className="lg:col-span-5 rounded-xl border border-white/[0.08] bg-[#0f172a] p-5 space-y-4">
            <div className="border-b border-white/[0.06] pb-3">
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#918fa1]">
                STEP 2 OF 2
              </div>
              <h2 className="text-lg font-bold text-white">
                Confirm Your Booking
              </h2>
            </div>

            {/* Candidate Profile Box */}
            <div className="rounded-lg bg-[#131b2e] p-3 border border-white/[0.06] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-full bg-[#4f46e5] text-white flex items-center justify-center font-bold text-xs">
                  MC
                </div>
                <div>
                  <div className="text-[10px] text-[#918fa1] uppercase">Candidate Profile</div>
                  <div className="font-bold text-xs text-[#dae2fd]">Marcus Chen</div>
                  <div className="text-[10px] font-mono text-[#918fa1]">marcus.chen@devmail.com</div>
                </div>
              </div>

              <span className="rounded bg-[#00a572]/20 px-2 py-0.5 text-[10px] font-mono text-[#4edea3] border border-[#4edea3]/30 flex items-center gap-1">
                <ShieldCheck className="h-3 w-3" />
                Verified Contact
              </span>
            </div>

            {/* Instant Verification Method */}
            <div className="space-y-2">
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#918fa1]">
                Instant Verification Method
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setVerificationMethod('otp')}
                  className={`rounded p-2.5 text-left border transition-all ${
                    verificationMethod === 'otp'
                      ? 'bg-[#171f33] border-[#4f46e5] text-white ring-1 ring-[#4f46e5]/40'
                      : 'bg-[#131b2e] border-white/[0.06] text-[#918fa1]'
                  }`}
                >
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-[#dae2fd]">
                    <Smartphone className="h-3.5 w-3.5 text-[#4edea3]" />
                    <span>SMS OTP</span>
                  </div>
                  <div className="text-[10px] font-mono text-[#918fa1] mt-0.5">+1 ••• 4921</div>
                </button>

                <button
                  onClick={() => setVerificationMethod('magic')}
                  className={`rounded p-2.5 text-left border transition-all ${
                    verificationMethod === 'magic'
                      ? 'bg-[#171f33] border-[#4f46e5] text-white ring-1 ring-[#4f46e5]/40'
                      : 'bg-[#131b2e] border-white/[0.06] text-[#918fa1]'
                  }`}
                >
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-[#dae2fd]">
                    <Mail className="h-3.5 w-3.5 text-[#c3c0ff]" />
                    <span>Magic Link</span>
                  </div>
                  <div className="text-[10px] font-mono text-[#918fa1] mt-0.5">1-Click in Email</div>
                </button>
              </div>

              {/* OTP Digits input */}
              {verificationMethod === 'otp' && (
                <div className="rounded bg-[#090d16] p-3 border border-white/[0.06] space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#918fa1]">Code sent to device</span>
                    <span className="text-[10px] font-mono text-[#4edea3]">Auto-populating token...</span>
                  </div>

                  <div className="flex justify-center gap-2 pt-1">
                    {otpDigits.map((digit, idx) => (
                      <input
                        key={idx}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => {
                          const newDigits = [...otpDigits];
                          newDigits[idx] = e.target.value;
                          setOtpDigits(newDigits);
                        }}
                        className="h-10 w-10 text-center font-mono text-base font-bold rounded border border-white/[0.15] bg-[#131b2e] text-white focus:border-[#4f46e5] focus:outline-none focus:ring-1 focus:ring-[#4f46e5]"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Accessibility & Special Topics */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#918fa1]">
                  Accessibility &amp; Special Topics
                </span>
                <span className="text-[10px] text-[#918fa1]">(optional)</span>
              </div>
              <textarea
                value={specialTopics}
                onChange={(e) => setSpecialTopics(e.target.value)}
                placeholder="e.g. Screen reader considerations, captioning preferences, or specific architectural focus areas..."
                rows={2}
                className="w-full rounded border border-white/[0.08] bg-[#090d16] p-2.5 text-xs text-[#dae2fd] placeholder-[#64748b] focus:border-[#4f46e5] focus:outline-none focus:ring-1 focus:ring-[#4f46e5]"
              />
            </div>

            {/* GDPR Consent */}
            <label className="flex items-start gap-2 text-xs text-[#c7c4d8] cursor-pointer">
              <input
                type="checkbox"
                checked={consentChecked}
                onChange={(e) => setConsentChecked(e.target.checked)}
                className="mt-0.5 h-3.5 w-3.5 rounded bg-[#131b2e] border-white/20 text-[#4f46e5] focus:ring-0 cursor-pointer"
              />
              <span className="text-[11px] leading-relaxed">
                I consent to SyncHire processing my interview schedule in accordance with GDPR &amp; DPDP compliance rules. Data automatically purges after 90 days.
              </span>
            </label>

            {/* Confirm CTA button */}
            <button
              onClick={handleConfirm}
              disabled={!consentChecked}
              className={`w-full flex items-center justify-center gap-2 rounded px-4 py-2.5 text-xs font-semibold shadow-md transition-all active:scale-[0.99] border-t border-white/20 cursor-pointer ${
                consentChecked
                  ? 'bg-[#4f46e5] text-white hover:bg-[#4338ca]'
                  : 'bg-[#222a3d] text-[#918fa1] cursor-not-allowed'
              }`}
            >
              <CalendarIcon className="h-4 w-4" />
              <span>Confirm Technical Interview</span>
            </button>

            <div className="text-center text-[10px] font-mono text-[#ffb95f]">
              ⚡ Need to change time? Reschedule with 1-click up to 4 hours before session.
            </div>

            {/* Calendar Sync Providers */}
            <div className="pt-2 border-t border-white/[0.06] space-y-2">
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#918fa1]">
                Sync Directly to Your Calendar
              </div>

              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => handleSyncCalendar('Google')}
                  className="rounded border border-white/[0.08] bg-[#131b2e] px-2.5 py-1.5 text-xs text-[#dae2fd] hover:bg-[#171f33] hover:text-white transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <CalendarIcon className="h-3.5 w-3.5 text-red-400" />
                  <span>Google</span>
                </button>

                <button
                  onClick={() => handleSyncCalendar('Outlook')}
                  className="rounded border border-white/[0.08] bg-[#131b2e] px-2.5 py-1.5 text-xs text-[#dae2fd] hover:bg-[#171f33] hover:text-white transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <CalendarIcon className="h-3.5 w-3.5 text-blue-400" />
                  <span>Outlook</span>
                </button>

                <button
                  onClick={() => handleSyncCalendar('.ICS')}
                  className="rounded border border-white/[0.08] bg-[#131b2e] px-2.5 py-1.5 text-xs text-[#dae2fd] hover:bg-[#171f33] hover:text-white transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Download className="h-3.5 w-3.5 text-[#4edea3]" />
                  <span>.ICS</span>
                </button>
              </div>

              {calendarSynced && (
                <div className="text-center text-[10px] font-mono text-[#4edea3]">
                  ✓ Downloaded {calendarSynced} calendar event package!
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer info bar */}
        <div className="pt-4 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4 text-xs text-[#918fa1]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-[#4edea3]" />
            <span className="font-semibold text-[#dae2fd]">Candidate First Experience</span>
            <span>• Zero password friction • Automated time synchronization • Encrypted video rooms</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <a href="#faqs" className="hover:text-white transition-colors">Candidate FAQs</a>
            <span>•</span>
            <a href="#accessibility" className="hover:text-white transition-colors">Accessibility Support</a>
            <span>•</span>
            <a href="#security" className="hover:text-white transition-colors">Security Overview</a>
          </div>
        </div>
      </div>
    </div>
  );
};
