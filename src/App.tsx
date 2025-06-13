import React, { useState } from 'react';
import { Heart, RotateCcw, Calculator, TrendingUp } from 'lucide-react';

const RealityFeedbackApp = () => {
  const [currentPage, setCurrentPage] = useState('criteria');
  const [criteria, setCriteria] = useState({
    minAge: 25,
    maxAge: 40,
    minHeight: 170,
    maxHeight: 190,
    religion: 'any',
    minSalary: 1500,
    bodyType: 'any',
    education: 'any',
    smokingStatus: 'any',
    maritalStatus: 'single'
  });
  
  const [result, setResult] = useState(null);

  // Cyprus demographics data based on research
  const cyprusData = {
    totalMales: 684000,
    ageDistribution: {
      '18-24': 0.08,
      '25-34': 0.15,
      '35-44': 0.14,
      '45-54': 0.13,
      '55-64': 0.12,
      '65+': 0.15
    },
    heightDistribution: {
      'under165': 0.05,
      '165-170': 0.20,
      '170-175': 0.30,
      '175-180': 0.25,
      '180-185': 0.15,
      'over185': 0.05
    },
    religionDistribution: {
      'orthodox': 0.95,
      'catholic': 0.015,
      'protestant': 0.01,
      'muslim': 0.006,
      'other': 0.019
    },
    salaryDistribution: {
      'under1000': 0.15,
      '1000-1500': 0.25,
      '1500-2500': 0.35,
      '2500-4000': 0.18,
      'over4000': 0.07
    },
    bodyTypeDistribution: {
      'slim': 0.25,
      'athletic': 0.30,
      'average': 0.35,
      'heavyset': 0.10
    },
    educationDistribution: {
      'highschool': 0.30,
      'bachelor': 0.45,
      'master': 0.20,
      'phd': 0.05
    },
    smokingDistribution: {
      'nonsmoker': 0.65,
      'smoker': 0.35
    },
    maritalDistribution: {
      'single': 0.35,
      'divorced': 0.08,
      'widowed': 0.02
    }
  };

  const calculatePercentage = () => {
    let percentage = 100;
    let availableMen = cyprusData.totalMales;

    // Age filtering
    const ageRanges = Object.keys(cyprusData.ageDistribution);
    let ageMatch = 0;
    
    if (criteria.minAge <= 24) ageMatch += cyprusData.ageDistribution['18-24'];
    if (criteria.minAge <= 34 && criteria.maxAge >= 25) ageMatch += cyprusData.ageDistribution['25-34'];
    if (criteria.minAge <= 44 && criteria.maxAge >= 35) ageMatch += cyprusData.ageDistribution['35-44'];
    if (criteria.minAge <= 54 && criteria.maxAge >= 45) ageMatch += cyprusData.ageDistribution['45-54'];
    if (criteria.minAge <= 64 && criteria.maxAge >= 55) ageMatch += cyprusData.ageDistribution['55-64'];
    if (criteria.maxAge >= 65) ageMatch += cyprusData.ageDistribution['65+'];
    
    percentage *= ageMatch;

    // Height filtering
    let heightMatch = 0;
    if (criteria.minHeight <= 165) heightMatch += cyprusData.heightDistribution['under165'];
    if (criteria.minHeight <= 170 && criteria.maxHeight >= 165) heightMatch += cyprusData.heightDistribution['165-170'];
    if (criteria.minHeight <= 175 && criteria.maxHeight >= 170) heightMatch += cyprusData.heightDistribution['170-175'];
    if (criteria.minHeight <= 180 && criteria.maxHeight >= 175) heightMatch += cyprusData.heightDistribution['175-180'];
    if (criteria.minHeight <= 185 && criteria.maxHeight >= 180) heightMatch += cyprusData.heightDistribution['180-185'];
    if (criteria.maxHeight >= 185) heightMatch += cyprusData.heightDistribution['over185'];
    
    percentage *= heightMatch;

    // Religion filtering
    if (criteria.religion !== 'any') {
      percentage *= cyprusData.religionDistribution[criteria.religion] || 0.01;
    }

    // Salary filtering
    let salaryMatch = 0;
    if (criteria.minSalary <= 1000) salaryMatch += cyprusData.salaryDistribution['under1000'];
    if (criteria.minSalary <= 1500) salaryMatch += cyprusData.salaryDistribution['1000-1500'];
    if (criteria.minSalary <= 2500) salaryMatch += cyprusData.salaryDistribution['1500-2500'];
    if (criteria.minSalary <= 4000) salaryMatch += cyprusData.salaryDistribution['2500-4000'];
    if (criteria.minSalary > 4000) salaryMatch += cyprusData.salaryDistribution['over4000'];
    
    percentage *= salaryMatch;

    // Body type filtering
    if (criteria.bodyType !== 'any') {
      percentage *= cyprusData.bodyTypeDistribution[criteria.bodyType] || 0.25;
    }

    // Education filtering
    if (criteria.education !== 'any') {
      percentage *= cyprusData.educationDistribution[criteria.education] || 0.25;
    }

    // Smoking status filtering
    if (criteria.smokingStatus !== 'any') {
      percentage *= cyprusData.smokingDistribution[criteria.smokingStatus] || 0.5;
    }

    // Marital status filtering
    if (criteria.maritalStatus !== 'any') {
      percentage *= cyprusData.maritalDistribution[criteria.maritalStatus] || 0.45;
    }

    const finalPercentage = Math.max(0.01, percentage);
    const estimatedCount = Math.round((finalPercentage / 100) * cyprusData.totalMales);
    
    setResult({
      percentage: finalPercentage,
      count: estimatedCount,
      criteria: { ...criteria }
    });
    setCurrentPage('results');
  };

  const resetCriteria = () => {
    setCriteria({
      minAge: 25,
      maxAge: 40,
      minHeight: 170,
      maxHeight: 190,
      religion: 'any',
      minSalary: 1500,
      bodyType: 'any',
      education: 'any',
      smokingStatus: 'any',
      maritalStatus: 'single'
    });
    setCurrentPage('criteria');
  };

  if (currentPage === 'results') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">Your Reality Check</h1>
              <p className="text-blue-200">Based on Cyprus demographics</p>
            </div>

            <div className="bg-white/5 rounded-2xl p-6 mb-8 border border-white/10">
              <div className="text-center mb-6">
                <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 mb-2">
                  {result.percentage.toFixed(2)}%
                </div>
                <p className="text-xl text-white">Chance of finding your ideal match</p>
                <p className="text-blue-200 mt-2">
                  Approximately <span className="font-semibold text-white">{result.count.toLocaleString()}</span> men in Cyprus match your criteria
                </p>
              </div>

              <div className="w-full bg-gray-700 rounded-full h-4 mb-4">
                <div 
                  className="h-4 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${Math.min(result.percentage, 100)}%` }}
                ></div>
              </div>
            </div>

            <div className="bg-white/5 rounded-2xl p-6 mb-8 border border-white/10">
              <h3 className="text-xl font-semibold text-white mb-4">Your Criteria Summary</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="text-blue-200">Age Range:</div>
                <div className="text-white">{result.criteria.minAge} - {result.criteria.maxAge} years</div>
                
                <div className="text-blue-200">Height Range:</div>
                <div className="text-white">{result.criteria.minHeight} - {result.criteria.maxHeight} cm</div>
                
                <div className="text-blue-200">Religion:</div>
                <div className="text-white capitalize">{result.criteria.religion}</div>
                
                <div className="text-blue-200">Min Salary:</div>
                <div className="text-white">€{result.criteria.minSalary.toLocaleString()}</div>
                
                <div className="text-blue-200">Body Type:</div>
                <div className="text-white capitalize">{result.criteria.bodyType}</div>
                
                <div className="text-blue-200">Education:</div>
                <div className="text-white capitalize">{result.criteria.education}</div>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={resetCriteria}
                className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-3 mx-auto"
              >
                <RotateCcw className="w-5 h-5" />
                Start New Search
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">Reality Feedback</h1>
            <p className="text-blue-200">Find your chances of meeting the perfect man in Cyprus</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Age Range */}
            <div className="space-y-4">
              <label className="block text-white font-semibold">Age Range</label>
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex-1">
                    <label className="text-blue-200 text-sm">Min Age: {criteria.minAge}</label>
                    <input
                      type="range"
                      min="18"
                      max="65"
                      value={criteria.minAge}
                      onChange={(e) => setCriteria({...criteria, minAge: parseInt(e.target.value)})}
                      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-blue-200 text-sm">Max Age: {criteria.maxAge}</label>
                    <input
                      type="range"
                      min="18"
                      max="65"
                      value={criteria.maxAge}
                      onChange={(e) => setCriteria({...criteria, maxAge: parseInt(e.target.value)})}
                      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Height Range */}
            <div className="space-y-4">
              <label className="block text-white font-semibold">Height Range (cm)</label>
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex-1">
                    <label className="text-blue-200 text-sm">Min: {criteria.minHeight}cm</label>
                    <input
                      type="range"
                      min="150"
                      max="200"
                      value={criteria.minHeight}
                      onChange={(e) => setCriteria({...criteria, minHeight: parseInt(e.target.value)})}
                      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-blue-200 text-sm">Max: {criteria.maxHeight}cm</label>
                    <input
                      type="range"
                      min="150"
                      max="200"
                      value={criteria.maxHeight}
                      onChange={(e) => setCriteria({...criteria, maxHeight: parseInt(e.target.value)})}
                      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Religion */}
            <div className="space-y-4">
              <label className="block text-white font-semibold">Religion</label>
              <select
                value={criteria.religion}
                onChange={(e) => setCriteria({...criteria, religion: e.target.value})}
                className="w-full bg-white/5 text-white border border-white/10 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="any">Any Religion</option>
                <option value="orthodox">Orthodox Christian</option>
                <option value="catholic">Catholic</option>
                <option value="protestant">Protestant</option>
                <option value="muslim">Muslim</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Minimum Salary */}
            <div className="space-y-4">
              <label className="block text-white font-semibold">Minimum Salary: €{criteria.minSalary.toLocaleString()}</label>
              <input
                type="range"
                min="500"
                max="8000"
                step="100"
                value={criteria.minSalary}
                onChange={(e) => setCriteria({...criteria, minSalary: parseInt(e.target.value)})}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>

            {/* Body Type */}
            <div className="space-y-4">
              <label className="block text-white font-semibold">Body Type</label>
              <select
                value={criteria.bodyType}
                onChange={(e) => setCriteria({...criteria, bodyType: e.target.value})}
                className="w-full bg-white/5 text-white border border-white/10 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="any">Any Body Type</option>
                <option value="slim">Slim</option>
                <option value="athletic">Athletic</option>
                <option value="average">Average</option>
                <option value="heavyset">Heavyset</option>
              </select>
            </div>

            {/* Education */}
            <div className="space-y-4">
              <label className="block text-white font-semibold">Education Level</label>
              <select
                value={criteria.education}
                onChange={(e) => setCriteria({...criteria, education: e.target.value})}
                className="w-full bg-white/5 text-white border border-white/10 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="any">Any Education</option>
                <option value="highschool">High School</option>
                <option value="bachelor">Bachelor's Degree</option>
                <option value="master">Master's Degree</option>
                <option value="phd">PhD</option>
              </select>
            </div>

            {/* Smoking Status */}
            <div className="space-y-4">
              <label className="block text-white font-semibold">Smoking Status</label>
              <select
                value={criteria.smokingStatus}
                onChange={(e) => setCriteria({...criteria, smokingStatus: e.target.value})}
                className="w-full bg-white/5 text-white border border-white/10 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="any">Any</option>
                <option value="nonsmoker">Non-smoker</option>
                <option value="smoker">Smoker</option>
              </select>
            </div>

            {/* Marital Status */}
            <div className="space-y-4">
              <label className="block text-white font-semibold">Marital Status</label>
              <select
                value={criteria.maritalStatus}
                onChange={(e) => setCriteria({...criteria, maritalStatus: e.target.value})}
                className="w-full bg-white/5 text-white border border-white/10 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="any">Any</option>
                <option value="single">Single</option>
                <option value="divorced">Divorced</option>
                <option value="widowed">Widowed</option>
              </select>
            </div>
          </div>

          <div className="text-center mt-8">
            <button
              onClick={calculatePercentage}
              className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-12 py-4 rounded-2xl font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-3 mx-auto"
            >
              <Calculator className="w-6 h-6" />
              Calculate My Chances
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(45deg, #ec4899, #8b5cf6);
          cursor: pointer;
          box-shadow: 0 0 10px rgba(236, 72, 153, 0.5);
        }
        
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(45deg, #ec4899, #8b5cf6);
          cursor: pointer;
          border: none;
          box-shadow: 0 0 10px rgba(236, 72, 153, 0.5);
        }
        
        .slider::-webkit-slider-track {
          background: linear-gradient(45deg, #ec4899, #8b5cf6);
          border-radius: 10px;
        }
        
        .slider::-moz-range-track {
          background: linear-gradient(45deg, #ec4899, #8b5cf6);
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

export default RealityFeedbackApp;