import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import {
  changePriceByButtons,
  handleTotalSum,
} from "../../../redux/slice/services";

export default function Counter({
  serviceId,
  count = 1,
  price,
  current,
  id,
  name,
  setActive,
}) {
  const intl = useIntl();
  const dispatch = useDispatch();
  const [currentPrice, setCurrentPrice] = useState(price * count);
  const [currentCount, setCurrentCount] = useState(count);

  const handleClick = (type) => {
    if(type == 'plus' && currentCount == 10) return;
    // toast.error(intl.formatMessage({ id: "servicesSelect" }));
    if (type === "minus" && currentCount > 1) {
      const newCount = currentCount - 1;
      const newPrice = newCount * price;
      setCurrentCount(newCount);
      setCurrentPrice(newPrice);
      dispatch(
        changePriceByButtons({
          serviceId,
          count: newCount,
          price: newPrice,
          id,
          name: name,
        })
      );
      dispatch(handleTotalSum());
    } else if (type === "plus") {
      const newCount = currentCount + 1;
      const newPrice = newCount * price;
      setCurrentCount(newCount);
      setCurrentPrice(newPrice);
      dispatch(
        changePriceByButtons({
          serviceId,
          count: newCount,
          price: newPrice,
          id,
          name: name,
        })
      );
      dispatch(handleTotalSum());
    }
    setTimeout(() => {
      setActive(true);
    }, 0);
  };

  // useEffect(() => {
  //   setCurrentPrice(price * count);
  //   setCurrentCount(count);
  // }, [current]);

  return (
    <div className="flex flex-col items-start xs:items-end gap-1">
      <div className="flex flex-row items-center gap-3">
        <button
          className="bg-grey-7 w-10 h-10 rounded-md font-medium text-xl pt-[1px]"
          type="button"
          onClick={() => handleClick("minus")}
        >
          -
        </button>
        <p>{currentCount}</p>
        <button
          className="bg-grey-7 w-10 h-10 rounded-md font-medium text-xl pt-[1px]"
          type="button"
          onClick={() => handleClick("plus")}
        >
          +
        </button>
      </div>
      <p className="text-sm text-green leading-normal font-medium">
        {currentPrice} {intl.formatMessage({ id: "sum" })}
      </p>
    </div>
  );
}
