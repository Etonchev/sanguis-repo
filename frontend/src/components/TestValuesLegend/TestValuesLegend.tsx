interface TestValuesLegendProps {
  lowerRange: number;
  upperRange: number;
}

const TestValuesLegend = ({lowerRange, upperRange}: TestValuesLegendProps) => {
  return (
    <div className="flex w-[70%] h-14 text-center self-end mt-8">
      <div className="h-full font-semibold bg-red-300 w-1/3">
        <div>High Risk</div>
        <div>{`< ${lowerRange}`}</div>
      </div>
      <div className="h-full font-semibold bg-green-300 w-1/3">
        <div>Optimal</div>
        <div>{`${lowerRange} - ${upperRange}`}</div>
      </div>
      <div className="h-full font-semibold bg-red-300 w-1/3">
        <div>High Risk</div>
        <div>{`> ${upperRange}`}</div>
      </div>
    </div>
  )
}

export default TestValuesLegend;
