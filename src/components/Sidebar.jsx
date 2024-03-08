import { Card, Typography } from '@material-tailwind/react';
import CardActivity from './CardActivity';

function Sidebar({ id, items }) {
  console.log(items[0].name);
  return (
    <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="mb-2 p-4">
        <Typography variant="h5" color="blue-gray">
          Sidebar
        </Typography>
      </div>

      <div className="flex flex-col gap-2">
        {items?.map((activity) => {
          return <CardActivity name={activity.name} />;
        })}
      </div>
    </Card>
  );
}

export default Sidebar;
