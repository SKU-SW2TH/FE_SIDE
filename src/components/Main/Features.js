// Features.js
import React from 'react';
import Feature from './Feature';
import '../../styles/Features.css';
import feature1 from '../../assets/images/feature1.png'
import feature2 from '../../assets/images/feature2.png'
import feature3 from '../../assets/images/feature3.png'

const featuresData = [
  {
    image: feature1,
    title: "각 분야 최고의 전문가들이 제공하는 프리미엄 강의",
    description: (
      <>
        각 분야 최고의 전문가들이 제공하는 프리미엄 강의는 실무 중심의<br />
        최신 트렌드를 반영하여 학습자가 즉시 적용 가능한 지식을 제공합니다.
      </>
    ),
  },
  {
    image: feature2,
    title: "나에게 맞는 스터디와 멘토를 완벽하게 매칭",
    description: (
      <>
        나에게 맞는 스터디와 멘토를 완벽하게 매칭하여<br />
        개인의 학습 스타일과 목표에 최적화된 지원을 제공합니다.
      </>
    ),
  },
  {
    image: feature3,
    title: "다양한 분야의 사람들과 소통하는 공간",
    description: (
      <>
        다양한 분야의 사람들과 자유롭게 의견을 나누고<br />
        서로의 경험을 공유하며 새로운 통찰과 협력의 기회를 제공합니다.
      </>
    ),
  },
];


function Features() {
  return (
    <section className="features">
      {featuresData.map((feature, index) => (
        <Feature
          key={index}
          image={feature.image}
          title={feature.title}
          description={feature.description}
        />
      ))}
    </section>
  );
}

export default Features;
