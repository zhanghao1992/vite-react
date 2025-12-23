import RcGantt, { enUS } from "rc-gantt";

const data = new Array(10).fill({
  name: "Title",
  startDate: "2024-11-10",
  endDate: "2024-11-12",
  collapsed: false,
  children: [
    {
      startDate: "2024-11-11",
      endDate: "2024-11-13",
      name: "sub Title",
      collapsed: false,
      content: "123123123",
    },
  ],
});

const RCGanttView = (props) => {
  return (
    <div style={{ width: "100%", height: 500 }}>
      <RcGantt
        data={data}
        // locale={enUS}
        columns={[
          {
            name: "name",
            label: "Title",
            width: 200,
            maxWidth: 200,
            minWidth: 200,
          },
        ]}
        onUpdate={async () => {
          return true;
        }}
      />
    </div>
  );
};
export default RCGanttView;
