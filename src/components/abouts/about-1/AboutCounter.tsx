import Count from "../../../common/count";

 
 
interface CounterItem {
  value: number;
  suffix?: string;
  label: string;
}

const counter_data: CounterItem[] = [
  {
    value: 12,
    suffix: "+",
    label: "Years of experience",
  },
  {
    value: 84,
    suffix: "k",
    label: "Satisfied clients",
  },
  {
    value: 60,
    suffix: "k+",
    label: "Project completed",
  },
  {
    value: 4,
    suffix: ".8/5",
    label: "Total success rate",
  },
];




export default function AboutCounter() {
  return (
    <div className="wioncounter-area bg-heading">
      <div className="container">
        <div className="wioncounter-wraper pb-0">

           {counter_data.map((item, i) =>(
              <div key={i} className="wioncounter-box box2">
              <h2 className="wioncounter-item item2 d-inline-flex align-items-center">
                <span className="odometer d-inline-block" data-odometer-final="12">
                <Count number={item.value} text={item.suffix} />
                </span> 
              </h2>
              <div className="wioncounter-data">
                <p>{item.label}</p>
              </div>
            </div>
            ))}  
        </div>
      </div>
    </div>
  )
}
