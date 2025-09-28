import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

interface StewardshipMeterProps {
  score: number; // 0–100
}

const StewardshipMeter: React.FC<StewardshipMeterProps> = ({ score }) => {
  const radius = 60;
  const strokeWidth = 12;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 100) * circumference;

  return (
    <View style={styles.container}>
      <Svg width={160} height={160} viewBox="0 0 160 160">
        {/* Background circle */}
        <Circle
          cx="80"
          cy="80"
          r={radius}
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
          fill="none"
        />

        {/* Progress circle */}
        <Circle
          cx="80"
          cy="80"
          r={radius}
          stroke="#22c55e"
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={circumference - progress}
          strokeLinecap="round"
          fill="none"
          rotation="-90"
          origin="80,80"
        />
      </Svg>

      {/* Score in the center */}
      <View style={styles.scoreContainer}>
        <Text style={styles.score}>{score}</Text>
        <Text style={styles.label}>Stewardship</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  score: {
    fontSize: 28,
    fontWeight: '700',
    color: '#374151',
  },
  label: {
    fontSize: 13,
    color: '#6b7280',
    marginTop: 2,
  },
});

export default StewardshipMeter;
