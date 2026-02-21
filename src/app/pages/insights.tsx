import { TopNav } from "../components/top-nav";

export function Insights() {
  return (
    <div className="min-h-screen bg-[#F7F9FC]">
      <TopNav showBack />
      
      <main className="pt-20 pb-8 px-5 max-w-md mx-auto">
        <h2 className="text-2xl text-[#3A4556] mb-2 leading-snug">
          Anonymized Insight Overview
        </h2>
        <p className="text-[#6B7684] mb-8 leading-relaxed">
          Aggregated data to understand patterns
        </p>

        {/* Power Imbalance */}
        <div className="bg-white p-6 rounded-xl border border-[#E9EEF5] mb-4">
          <h3 className="text-sm text-[#6B7684] mb-4">
            Cases Involving Power Imbalance
          </h3>
          <div className="mb-3">
            <div className="flex justify-between mb-2">
              <span className="text-2xl text-[#3A4556]">73%</span>
            </div>
            <div className="w-full h-2 bg-[#E9EEF5] rounded-full overflow-hidden">
              <div className="h-full bg-[#5C6F8F]" style={{ width: "73%" }} />
            </div>
          </div>
          <p className="text-sm text-[#6B7684] leading-relaxed">
            Most reported cases involve some form of authority differential
          </p>
        </div>

        {/* Retaliation Risk */}
        <div className="bg-white p-6 rounded-xl border border-[#E9EEF5] mb-4">
          <h3 className="text-sm text-[#6B7684] mb-4">
            Cases with Retaliation Risk
          </h3>
          <div className="mb-3">
            <div className="flex justify-between mb-2">
              <span className="text-2xl text-[#3A4556]">54%</span>
            </div>
            <div className="w-full h-2 bg-[#E9EEF5] rounded-full overflow-hidden">
              <div className="h-full bg-[#D8A657]" style={{ width: "54%" }} />
            </div>
          </div>
          <p className="text-sm text-[#6B7684] leading-relaxed">
            Over half of assessments indicate potential retaliation concern
          </p>
        </div>

        {/* Environment Distribution */}
        <div className="bg-white p-6 rounded-xl border border-[#E9EEF5] mb-4">
          <h3 className="text-sm text-[#6B7684] mb-4">
            Distribution by Environment
          </h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-[#3A4556]">Workplace</span>
                <span className="text-sm text-[#6B7684]">42%</span>
              </div>
              <div className="w-full h-2 bg-[#E9EEF5] rounded-full overflow-hidden">
                <div className="h-full bg-[#5C6F8F]" style={{ width: "42%" }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-[#3A4556]">Campus</span>
                <span className="text-sm text-[#6B7684]">31%</span>
              </div>
              <div className="w-full h-2 bg-[#E9EEF5] rounded-full overflow-hidden">
                <div className="h-full bg-[#6BA8A9]" style={{ width: "31%" }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-[#3A4556]">Online</span>
                <span className="text-sm text-[#6B7684]">18%</span>
              </div>
              <div className="w-full h-2 bg-[#E9EEF5] rounded-full overflow-hidden">
                <div className="h-full bg-[#7FAF8E]" style={{ width: "18%" }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-[#3A4556]">Public Space</span>
                <span className="text-sm text-[#6B7684]">9%</span>
              </div>
              <div className="w-full h-2 bg-[#E9EEF5] rounded-full overflow-hidden">
                <div className="h-full bg-[#D8A657]" style={{ width: "9%" }} />
              </div>
            </div>
          </div>
        </div>

        {/* Risk Level Breakdown */}
        <div className="bg-white p-6 rounded-xl border border-[#E9EEF5] mb-4">
          <h3 className="text-sm text-[#6B7684] mb-4">Risk Level Breakdown</h3>
          <div className="flex gap-4">
            <div className="flex-1 text-center">
              <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-[#7FAF8E]/20 flex items-center justify-center">
                <span className="text-xl text-[#7FAF8E]">28%</span>
              </div>
              <p className="text-xs text-[#6B7684]">Low</p>
            </div>
            <div className="flex-1 text-center">
              <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-[#D8A657]/20 flex items-center justify-center">
                <span className="text-xl text-[#D8A657]">49%</span>
              </div>
              <p className="text-xs text-[#6B7684]">Medium</p>
            </div>
            <div className="flex-1 text-center">
              <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-[#C97B7B]/20 flex items-center justify-center">
                <span className="text-xl text-[#C97B7B]">23%</span>
              </div>
              <p className="text-xs text-[#6B7684]">High</p>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-[#E9EEF5] p-5 rounded-xl">
          <p className="text-sm text-[#6B7684] leading-relaxed">
            All data is fully anonymized and aggregated. No personally
            identifiable information is included in these insights.
          </p>
        </div>
      </main>
    </div>
  );
}
