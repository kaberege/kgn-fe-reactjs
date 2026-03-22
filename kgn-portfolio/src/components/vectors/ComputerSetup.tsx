interface ComputerSetupProps {
  mode?: boolean;
  profileImg: string;
  accentColor?: string;
}

const ComputerSetup: React.FC<ComputerSetupProps> = ({
  mode,
  profileImg,
  accentColor = "#00D1FF",
}) => {
  const isDark: boolean | undefined = mode;

  const chassisColor: string = isDark ? "#F1F5F9" : "#2C3036";
  const chassisDark: string = isDark ? "#94A3B8" : "#121418";
  const screenBg: string = isDark ? "#1e1e1e" : "#FFFFFF";
  const terminalBg: string = isDark ? "#1a1c21" : "#F8FAFC";
  const mugFill: string = isDark ? "#FFFFFF" : "#2A2A2A";
  const mugStroke: string = isDark ? "#E2E8F0" : "#444";
  const coffeeFill: string = isDark ? "#2A1B12" : "#4E342E";
  const speakerFill: string = isDark ? "#F8FAFC" : "#0F0F0F";
  const speakerInner: string = isDark ? "#94A3B8" : "#1A1A1A";
  const speakerInnerStroke = isDark ? "#333" : "#94A3B8";
  const speakerBounce: string = isDark ? "#007BFF" : accentColor;
  const steamColor: string = isDark
    ? "rgba(255, 255, 255, 0.6)"
    : "rgba(100, 100, 100, 0.4)";

  return (
    <svg
      viewBox="0 0 1200 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-auto w-full drop-shadow-2xl"
    >
      <defs>
        <clipPath id="avatarClip">
          <circle cx="180" cy="150" r="110" />
        </clipPath>

        <clipPath id="editorWindow">
          <rect x="0" y="40" width="335" height="180" />
        </clipPath>

        <linearGradient id="metalBody" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={chassisColor} />
          <stop offset="100%" stopColor={chassisDark} />
        </linearGradient>

        <style>
          {`
            @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
            @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-12px); } }
            @keyframes terminalScroll {
              0%, 20% { transform: translateY(0); }
              30%, 50% { transform: translateY(-80px); }
              60%, 80% { transform: translateY(-120px); }
              100% { transform: translateY(0); }
            }
            @keyframes steamrise {
              0% { transform: translateY(0) scale(1); opacity: 0; }
              15% { opacity: 1; }
              80% { opacity: 0.8; }
              100% { transform: translateY(-60px) scale(1.5); opacity: 0; }
            }
            @keyframes tilt {
             0%, 100% { transform: perspective(500px) rotateY(0deg); }
             25% { transform: perspective(500px) rotateY(-25deg); }
             75% { transform: perspective(500px) rotateY(25deg); }
            }
            @keyframes profile-composite {
              0% { transform: rotate(0deg); opacity: 0.4; stroke-width: 4; }
              50% { opacity: 1; stroke-width: 6; }
              100% { transform: rotate(360deg); opacity: 0.4; stroke-width: 4; }
            }
            @keyframes wheel-glow {
              0%, 100% { 
                filter: drop-shadow(0 0 2px ${accentColor}); 
                opacity: 0.8; 
              }
              50% { 
                filter: drop-shadow(0 0 6px ${accentColor}) drop-shadow(0 0 2px ${isDark ? "#000" : accentColor}); 
                opacity: 1; 
              }
            }
            @keyframes mouse-click {
              0%, 90%, 100% { transform: scaleY(1); }
              95% { transform: scaleY(0.98); transform-origin: bottom; }
            }

            .mouse-body { animation: mouse-click 4s ease-in-out infinite; }
            .mouse-wheel { animation: wheel-glow 2s ease-in-out infinite; }
            .steam {
              animation: steamrise 3s ease-out infinite;
              opacity: 0;
            }
            .steam-1 { animation-delay: 0s; }
            .steam-2 { animation-delay: 0.8s; }
            .steam-3 { animation-delay: 1.6s; }

            .mug-tilt {
              transform-origin: 127.5px 355px; 
              animation: tilt 6s ease-in-out infinite;
              transform-style: preserve-3d;
            }
            .cursor { animation: blink 1s infinite; }
            .floating { 
              animation: float 5s ease-in-out infinite; 
              will-change: transform; 
            }
            .scrolling-code { animation: terminalScroll 10s cubic-bezier(0.65, 0, 0.35, 1) infinite; }
            .profile-glow { 
              animation: profile-composite 10s linear infinite; 
              transform-origin: 180px 150px;
            }
          `}
        </style>
      </defs>
      <g className="mug-tilt" transform-origin="127.5px 355px">
        <g transform="translate(100, 280)">
          <path
            d="M 20 0 Q 25 -10, 20 -20 Q 15 -30, 20 -40"
            stroke={steamColor}
            strokeWidth="3"
            fill="none"
            className="steam steam-1"
            strokeLinecap="round"
          />
          <path
            d="M 30 0 Q 35 -15, 30 -30 Q 25 -45, 30 -60"
            stroke={steamColor}
            strokeWidth="2.5"
            fill="none"
            className="steam steam-2"
            strokeLinecap="round"
          />
          <path
            d="M 40 0 Q 35 -10, 40 -20 Q 45 -30, 40 -40"
            stroke={steamColor}
            strokeWidth="3"
            fill="none"
            className="steam steam-3"
            strokeLinecap="round"
          />
        </g>
        <rect
          x="100"
          y="280"
          width="55"
          height="75"
          rx="10"
          fill={mugFill}
          stroke={mugStroke}
          strokeWidth="1"
        />
        <path
          d="M155 300 Q180 320 155 340"
          stroke={isDark ? "#CBD5E1" : "#333"}
          strokeWidth="5"
          fill="none"
        />
        <ellipse cx="127.5" cy="290" rx="22" ry="8" fill={coffeeFill} />
      </g>
      <g className="floating">
        <rect
          x="15"
          y="120"
          width="70"
          height="240"
          rx="15"
          fill={speakerFill}
        />
        <circle
          cx="50"
          cy="180"
          r="22"
          fill={speakerInner}
          stroke={speakerInnerStroke}
        />
        <circle
          cx="50"
          cy="330"
          r="4"
          fill={speakerBounce}
          className="animate-pulse"
        />
      </g>
      <g transform="translate(220, 40)">
        <rect
          width="760"
          height="320"
          rx="18"
          fill={isDark ? "#eee" : "#1E293B"}
        />
        <rect
          x="12"
          y="12"
          width="736"
          height="296"
          rx="10"
          fill={isDark ? "#aaa" : "#555"}
        />
        <rect x="20" y="20" width="720" height="280" rx="4" fill={screenBg} />
        <g transform="translate(10, 10)">
          <g clipPath="url(#avatarClip)">
            <image
              x="70"
              y="40"
              width="220"
              height="220"
              href={profileImg}
              preserveAspectRatio="xMidYMid slice"
            />
          </g>

          <circle
            cx="180"
            cy="150"
            r="115"
            stroke={accentColor}
            strokeWidth="4"
            fill="none"
            strokeDasharray="20 15"
            strokeLinecap="round"
            className="profile-glow"
          />
        </g>
        <g transform="translate(385, 45)">
          <rect
            width="335"
            height="230"
            rx="12"
            fill={terminalBg}
            stroke={isDark ? "#3e4451" : "#E2E8F0"}
            strokeWidth="2"
          />
          <circle cx="25" cy="22" r="5" fill="#FF5F56" />
          <circle cx="45" cy="22" r="5" fill="#FFBD2E" />
          <circle cx="65" cy="22" r="5" fill="#27C93F" />

          <g clipPath="url(#editorWindow)">
            <g
              transform="translate(30, 60)"
              fontFamily="'Fira Code', monospace"
              fontSize="14"
              fontWeight="600"
              className="scrolling-code"
            >
              <text x="15" y="65" fill="#C678DD">
                const <tspan fill="#61AFEF">buildApp</tspan> = () =&gt; &#123;
              </text>
              <text x="30" y="90" fill="#ABB2BF">
                {" "}
                const <tspan fill="#E5C07B">stack</tspan> = [
                <tspan fill="#98C379">'React'</tspan>];
              </text>
              <text x="30" y="115" fill="#C678DD">
                {" "}
                return <tspan fill="#ABB2BF">stack.push(</tspan>
                <tspan fill="#98C379">'prod'</tspan>
                <tspan fill="#ABB2BF">)</tspan>
              </text>
              <text x="15" y="140" fill="#C678DD">
                &#125;;
              </text>
              <text x="15" y="180" fill="#C678DD">
                async function <tspan fill="#61AFEF">deploy</tspan>() &#123;
              </text>
              <text x="30" y="205" fill="#ABB2BF">
                {" "}
                await <tspan fill="#61AFEF">optimize</tspan>(assets);
              </text>
              <text x="30" y="230" fill="#61AFEF">
                {" "}
                console<tspan fill="#ABB2BF">.log(</tspan>
                <tspan fill="#98C379">`Live!`</tspan>
                <tspan fill="#ABB2BF">)</tspan>
              </text>
              <text x="15" y="255" fill="#C678DD">
                &#125;
              </text>
              <text x="15" y="295" fill="#5C6370" fontStyle="italic">
                // Initialize production
              </text>
              <text x="15" y="320" fill="#61AFEF">
                deploy<tspan fill="#ABB2BF">();</tspan>
              </text>
              <rect
                x="85"
                y="305"
                width="8"
                height="18"
                fill={accentColor}
                className="cursor"
              />
            </g>
          </g>
        </g>
        <path
          d="M-20 320 H780 L815 440 H-55 L-20 320Z"
          fill="url(#metalBody)"
        />
        <g transform="translate(20, 345)">
          {[0, 1, 2].map((row) =>
            [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((col) => (
              <rect
                key={`${row}-${col}`}
                x={-35 + col * 51}
                y={row * 28}
                width="42"
                height="22"
                rx="4"
                fill={isDark ? "#FFFFFF" : "#3a3f44"}
                stroke={isDark ? "#3a3f44" : "#1a1c21"}
              />
            )),
          )}
          <rect
            x="220"
            y="84"
            width="300"
            height="22"
            rx="4"
            fill={isDark ? "#F1F5F9" : "#4b5563"}
            stroke={isDark ? "#CBD5E1" : "#1a1c21"}
          />
        </g>
      </g>
      <g className="floating">
        <rect
          x="1115"
          y="120"
          width="70"
          height="240"
          rx="15"
          fill={speakerFill}
        />
        <circle
          cx="1150"
          cy="180"
          r="22"
          fill={speakerInner}
          stroke={speakerInnerStroke}
        />
        <circle
          cx="1150"
          cy="330"
          r="4"
          fill={speakerBounce}
          className="animate-pulse"
        />
      </g>
      <g transform="translate(1035, 330)">
        <g className="mouse-body">
          <path
            d="M15 0 C 45 0, 75 15, 75 50 C 75 85, 45 95, 15 95 C -10 95, -5 70, -5 45 C -5 15, -10 0, 15 0 Z"
            fill={isDark ? "#FFFFFF" : "#2D2D2D"}
            stroke={isDark ? "#94A3B8" : "#1A1A1A"}
            strokeWidth="1.5"
          />
          <rect
            className="mouse-wheel"
            x="14"
            y="12"
            width="10"
            height="22"
            rx="5"
            fill={accentColor}
            stroke={isDark ? "#1E293B" : accentColor}
            strokeWidth="1"
          />
          <rect
            x="-3"
            y="40"
            width="3"
            height="18"
            rx="1.5"
            fill={accentColor}
            opacity={isDark ? "1" : "0.7"}
          />
          <path
            d="M19 2 V 35"
            stroke={isDark ? "#CBD5E1" : "#444"}
            strokeWidth="1"
            opacity={isDark ? "0.8" : "0.5"}
          />
        </g>
      </g>
    </svg>
  );
};

export default ComputerSetup;
