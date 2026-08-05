'use client';

interface RangeSliderProps {
  min: number;
  max: number;
  minValue: number;
  maxValue: number;
  onChange: (min: number, max: number) => void;
  step?: number;
  label?: string;
  format?: (value: number) => string;
}

export default function RangeSlider({
  min,
  max,
  minValue,
  maxValue,
  onChange,
  step = 1,
  label,
  format = (v) => String(v)
}: RangeSliderProps) {
  return (
    <div className="w-full space-y-4">
      {label && <label className="block text-xs font-medium text-[#334155]">{label}</label>}
      
      {/* Display values */}
      <div className="flex items-center justify-between rounded-lg bg-blue-50 px-4 py-3 border border-blue-100">
        <div className="text-center">
          <p className="text-xs text-slate-600 uppercase tracking-wide font-medium">From</p>
          <p className="text-lg font-bold text-[#1C398E]">{format(minValue)}</p>
        </div>
        <div className="h-8 w-px bg-blue-200" />
        <div className="text-center">
          <p className="text-xs text-slate-600 uppercase tracking-wide font-medium">To</p>
          <p className="text-lg font-bold text-[#1C398E]">{format(maxValue)}</p>
        </div>
      </div>

      {/* Slider container */}
      <div className="px-1">
        <div className="relative overflow-hidden h-3 rounded-full bg-gradient-to-r from-slate-200 to-slate-300 shadow-inner">
          {/* Progress bar */}
          <div
            className="absolute h-5 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 shadow-md"
            style={{
              left: `${((minValue - min) / (max - min)) * 100}%`,
              width: `${((maxValue - minValue) / (max - min)) * 100}%`
            }}
          />
        </div>

        {/* Sliders container */}
        <div className="relative -mx-1 h-6" style={{ marginTop: '-7px' }}>
          {/* Min slider */}
          <input
            type="range"
            min={min}
            max={max}
            value={minValue}
            onChange={(e) => {
              const newMin = Number(e.target.value);
              if (newMin <= maxValue) {
                onChange(newMin, maxValue);
              }
            }}
            step={step}
            className="pointer-events-none absolute h-full w-full -translate-y-1/2 appearance-none bg-transparent outline-none"
            style={{
              zIndex: minValue > max - (max - min) / 3 ? 5 : 3
            }}
          />

          {/* Max slider */}
          <input
            type="range"
            min={min}
            max={max}
            value={maxValue}
            onChange={(e) => {
              const newMax = Number(e.target.value);
              if (newMax >= minValue) {
                onChange(minValue, newMax);
              }
            }}
            step={step}
            className="pointer-events-none absolute h-full w-full -translate-y-1/2 appearance-none bg-transparent outline-none"
            style={{
              zIndex: maxValue < min + (max - min) / 3 ? 5 : 3
            }}
          />
        </div>
      </div>

      <style>{`
        input[type='range'] {
          pointer-events: auto;
        }

        input[type='range']::-webkit-slider-thumb {
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
          cursor: grab;
          border: 3px solid white;
          box-shadow: 0 2px 8px rgba(37, 99, 235, 0.4);
          transition: all 0.2s ease;
        }

        input[type='range']::-webkit-slider-thumb:active {
          cursor: grabbing;
          transform: scale(1.1);
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.6);
        }

        input[type='range']::-webkit-slider-thumb:hover {
          background: linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%);
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.6);
        }

        input[type='range']::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
          cursor: grab;
          border: 3px solid white;
          box-shadow: 0 2px 8px rgba(37, 99, 235, 0.4);
          transition: all 0.2s ease;
        }

        input[type='range']::-moz-range-thumb:active {
          cursor: grabbing;
          transform: scale(1.1);
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.6);
        }

        input[type='range']::-moz-range-thumb:hover {
          background: linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%);
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.6);
        }

        input[type='range']::-moz-range-track {
          background: transparent;
          border: none;
        }

        input[type='range']::-moz-range-progress {
          background: transparent;
        }

        input[type='range']::-webkit-slider-runnable-track {
          background: transparent;
          height: 100%;
        }
      `}</style>
    </div>
  );
}
