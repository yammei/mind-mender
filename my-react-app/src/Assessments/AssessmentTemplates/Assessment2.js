import React, { useState } from 'react';
import { SocialSelfCareScale, scores } from './Question2';
import axios from 'axios';

const Assessment2 = (props) => {

  const displayThreshold = 30/2;
  const updateGlobalScore = props.onScoresUpdate;
  const [isScoresSent, setIsScoresSent] = useState(false);

  const handleSendScores = async (scores) => {
    try {

      const userId = localStorage.getItem('userId');

      if (!userId) {
        console.error('User ID not found in local storage');
        return;
      }

      const apiUrl = `http://localhost:4000/api/score2/${userId}`;
      const response = await axios.post(apiUrl, { assessmentName: 'socialselfcare', scoreDistribution: scores});

      const sum = scores.reduce((acc, curr) => acc + curr, 0);

      if (sum < displayThreshold) {
        updateGlobalScore(scores, true);
        console.log(`Score of ${sum} fell below display threshold. Display thershold is set to ${sum < displayThreshold}`);
      } else {
        updateGlobalScore(scores, false);
        console.log(`Score of ${sum} did not fall below display threshold. Display thershold is set to ${sum < displayThreshold}`);
      }

      setIsScoresSent(true);
      scrollToPosition();
      // window.location.href = '/MainPage';
    } catch (error) {
      console.error('Error sending scores:', error);
    }
  };

  const scrollToPosition = () => {
    const scrollToTop = 0;

    window.scrollTo({
      top: scrollToTop,
      behavior: 'smooth',
    });
  };

  return (
      <div className='Assessment-Container'>
        <SocialSelfCareScale index={0} title="Spend time with people who I like."> </SocialSelfCareScale>
        <SocialSelfCareScale index={1} title="Contact friends and family who are far away."> </SocialSelfCareScale>
        <SocialSelfCareScale index={2} title="Have stimulating conversations."> </SocialSelfCareScale>
        <SocialSelfCareScale index={3} title="Meet new people."> </SocialSelfCareScale>
        <SocialSelfCareScale index={4} title="Spend time alone with my love ones."> </SocialSelfCareScale>
        <SocialSelfCareScale index={5} title="Ask others for help, when needed."> </SocialSelfCareScale>
        <SocialSelfCareScale index={6} title="Do enjoyable activities with other people."> </SocialSelfCareScale>
        <SocialSelfCareScale index={7} title="Have intimate time with love ones."> </SocialSelfCareScale>
        <SocialSelfCareScale index={8} title="Keep in touch with old friends."> </SocialSelfCareScale>
        <SocialSelfCareScale index={9} title="In your opinion, what would you rate your social self-care."> </SocialSelfCareScale>
        <button className='Assessment-Submit' onClick={() => handleSendScores(scores)}>Submit</button>
    </div>
  );
};

export default Assessment2;
