//utils
import moment from "moment";
import "moment/locale/es";
moment.locale("es");

export default function useTaskUtils() {
  //Da formato legible a las fehcas almacenadas en la DB
  const formatDate = (date) => {
    const res = moment(JSON.parse(date)).format("LL");

    return res;
  };

  return {
    formatDate,
  };
}
