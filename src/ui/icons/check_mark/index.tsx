import IIconProps from "../type";

const IconCheckMark = ({
  width,
  height,
  color = "#000000",
  ...props
}: IIconProps) => {
  return (
    <svg
      version="1.1"
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 44.56 44.56"
      width={width}
      height={height}
      {...props}
    >
      <g>
        <g>
          <path
            d="M23.297,38.74c-1.17,1.588-2.992,2.564-4.962,2.661c-1.97,0.098-3.878-0.696-5.198-2.162L1.308,26.112 c-1.88-2.085-1.713-5.299,0.372-7.179c2.087-1.88,5.299-1.712,7.179,0.374l8.369,9.288c0.124,0.138,0.304,0.212,0.489,0.203 c0.186-0.009,0.356-0.102,0.467-0.25L35.386,5.217c1.665-2.26,4.847-2.741,7.108-1.075c2.259,1.666,2.739,4.848,1.073,7.107 L23.297,38.74z"
            fill={color}
          ></path>
        </g>
      </g>
    </svg>
  );
};

export default IconCheckMark;
