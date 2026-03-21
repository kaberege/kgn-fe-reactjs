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
  const isDark = mode;

  const chassisColor = isDark ? "#2C3036" : "#F1F5F9";
  const chassisDark = isDark ? "#121418" : "#94A3B8";
  const screenBg = isDark ? "#1e1e1e" : "#FFFFFF";
  const terminalBg = isDark ? "#1a1c21" : "#F8FAFC";
  const mugFill = isDark ? "#2A2A2A" : "#FFFFFF";
  const mugStroke = isDark ? "#444" : "#E2E8F0";

  return (
    <svg
      viewBox="0 0 1200 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full drop-shadow-2xl"
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
            .cursor { animation: blink 1s infinite; }
            .floating { animation: float 5s ease-in-out infinite; will-change: transform; }
            .scrolling-code { animation: terminalScroll 10s cubic-bezier(0.65, 0, 0.35, 1) infinite; }
          `}
        </style>
      </defs>
      <g className="floating" style={{ animationDelay: "0.5s" }}>
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
          stroke={isDark ? "#333" : "#CBD5E1"}
          strokeWidth="5"
          fill="none"
        />
        <ellipse cx="127.5" cy="290" rx="22" ry="8" fill="#3d2b1f" />
      </g>
      <g className="floating">
        <rect x="15" y="120" width="70" height="240" rx="15" fill="#111" />
        <circle cx="50" cy="180" r="22" fill="#000" stroke="#222" />
        <circle
          cx="50"
          cy="330"
          r="4"
          fill={accentColor}
          className="animate-pulse"
        />
      </g>
      <g transform="translate(220, 40)">
        <rect
          width="760"
          height="320"
          rx="18"
          fill={isDark ? "#0F172A" : "#1E293B"}
        />
        <rect x="12" y="12" width="736" height="296" rx="10" fill="#000" />
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
            className="animate-pulse"
            opacity="0.6"
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
                fill={isDark ? "#3a3f44" : "#FFFFFF"}
                stroke={isDark ? "#1a1c21" : "#CBD5E1"}
              />
            )),
          )}
          <rect
            x="220"
            y="84"
            width="300"
            height="22"
            rx="4"
            fill={isDark ? "#4b5563" : "#F1F5F9"}
            stroke={isDark ? "#1a1c21" : "#CBD5E1"}
          />
        </g>
      </g>
      <g className="floating">
        <rect x="1115" y="120" width="70" height="240" rx="15" fill="#111" />
        <circle cx="1150" cy="180" r="22" fill="#000" stroke="#222" />
        <circle
          cx="1150"
          cy="330"
          r="4"
          fill={accentColor}
          className="animate-pulse"
        />
      </g>
      <g className="floating" style={{ animationDelay: "0.2s" }}>
        <rect
          x="1025"
          y="320"
          width="55"
          height="95"
          rx="27"
          fill={isDark ? "#333" : "#FFFFFF"}
          stroke={isDark ? "#444" : "#CBD5E1"}
        />
        <path
          d="M1052 320 V200 H980"
          stroke={isDark ? "#555" : "#CBD5E1"}
          strokeWidth="2"
          fill="none"
        />
      </g>
    </svg>
  );
};

export default ComputerSetup;
