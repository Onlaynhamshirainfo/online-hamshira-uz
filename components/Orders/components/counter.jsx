import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import {
  changePriceByButtons,
  handleTotalSum, removeFromCurrentPrice,
} from "../../../redux/slice/services";

export default function Counter({
  serviceId,
  count = 0,
  price,
  current,
  id,
  name,
  setActive,
}) {
  const intl = useIntl();
  const dispatch = useDispatch();
  const [currentPrice, setCurrentPrice] = useState(count ? price * count : price);
  const [currentCount, setCurrentCount] = useState(count);

  const handleClick = (type) => {
    if(type == 'plus' && currentCount == 10) return;
    // toast.error(intl.formatMessage({ id: "servicesSelect" }));
    let nc;
    if (type === "minus" && currentCount > 0) {
      const newCount = currentCount - 1;
      nc = newCount;
      if (!newCount) {
        setActive(false);
      }
      const newPrice = newCount ? currentCount * price : price;
      setCurrentCount(newCount);
      setCurrentPrice(newPrice);

      if (nc === 0) {
        dispatch(removeFromCurrentPrice(id));
      } else if (nc > 0) {
        dispatch(
          changePriceByButtons({
            serviceId,
            count: newCount,
            price: newCount ? newPrice : 0,
            id,
            name: name,
          })
        );
      }
      dispatch(handleTotalSum());
    } else if (type === "plus") {
      const newCount = currentCount + 1;
      nc = newCount;
      const newPrice = newCount * price;
      setCurrentCount(newCount);
      setCurrentPrice(newPrice);

      if (nc === 0) {
        dispatch(removeFromCurrentPrice(id));
      } else if (nc > 0) {
        dispatch(
          changePriceByButtons({
            serviceId,
            count: newCount,
            price: newPrice,
            id,
            name: name,
          })
        );
      }
      dispatch(handleTotalSum());
    }
    if (nc > 0) {
      setActive(true);
    }
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
