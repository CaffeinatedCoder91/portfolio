'use client';
// Uses timers and Intl browser updates for the live local time display.

import React, { useEffect, useState } from 'react';

interface Props {
  timezone: string;
}

const HeroClient = ({ timezone }: Props) => {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat('en-GB', {
        timeZone: timezone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      });

      const parts = formatter.formatToParts(now);
      const timeString = parts.map((p) => p.value).join('');
      setTime(timeString);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, [timezone]);

  return <time dateTime={time}>{time}</time>;
};

export default HeroClient;
