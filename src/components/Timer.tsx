import React, {useEffect, useState} from 'react';

type Props = {
  className: string;
  isRunning: Boolean;
  reset: Boolean;
  OnStop: (time: number) => void;
};

export default function Timer({className, isRunning, reset, OnStop}: Props) {
  const [Time, setTime] = useState(0);

  useEffect(() => {
    if (isRunning) {
      const timeout = setTimeout(() => {
        setTime(Time + 1);
      }, 1000);

      return () => {
        clearTimeout(timeout);
      };
    } else {
      OnStop(Time);
    }
  }, [isRunning, Time]);

  useEffect(() => {
    if (reset) setTime(0);
  }, [reset]);
  return <p className={className}>{Time}</p>;
}
