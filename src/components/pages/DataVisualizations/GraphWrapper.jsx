import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import CitizenshipMapAll from './Graphs/CitizenshipMapAll';
import CitizenshipMapSingleOffice from './Graphs/CitizenshipMapSingleOffice';
import TimeSeriesAll from './Graphs/TimeSeriesAll';
import OfficeHeatMap from './Graphs/OfficeHeatMap';
import TimeSeriesSingleOffice from './Graphs/TimeSeriesSingleOffice';
import YearLimitsSelect from './YearLimitsSelect';
import ViewSelect from './ViewSelect';
import axios from 'axios';
import { resetVisualizationQuery } from '../../../state/actionCreators';
import { colors } from '../../../styles/data_vis_colors';
import ScrollToTopOnMount from '../../../utils/scrollToTopOnMount';
import { setData } from '../../../state/actionCreators';

const { background_color } = colors;

function GraphWrapper(props) {
  const { set_view, dispatch } = props;

  let { office, view } = useParams();

  if (!view) {
    set_view('time-series');
    view = 'time-series';
  }
  let map_to_render;
  if (!office) {
    switch (view) {
      case 'time-series':
        map_to_render = <TimeSeriesAll />;
        break;
      case 'office-heat-map':
        map_to_render = <OfficeHeatMap />;
        break;
      case 'citizenship':
        map_to_render = <CitizenshipMapAll />;
        break;
      default:
        break;
    }
  } else {
    switch (view) {
      case 'time-series':
        map_to_render = <TimeSeriesSingleOffice office={office} />;
        break;
      case 'citizenship':
        map_to_render = <CitizenshipMapSingleOffice office={office} />;
        break;
      default:
        break;
    }
  }
  async function updateStateWithNewData(
    years,
    view,
    office,
    stateSettingCallback
  ) {
    if (office === 'all' || !office) {
      const [firstResponse, secondResponse] = await Promise.all([
        axios.get(`https://hrf-asylum-be-b.herokuapp.com/cases/fiscalSummary`),
        axios.get(
          `https://hrf-asylum-be-b.herokuapp.com/cases/citizenshipSummary`
        ),
      ]);

      let data = firstResponse.data;
      data.citizenshipResults = secondResponse.data;
      dispatch(setData(data));
      stateSettingCallback(view, office, data);
    } else {
      const [firstResponse, secondResponse] = await Promise.all([
        axios.get(`https://hrf-asylum-be-b.herokuapp.com/cases/fiscalSummary`),
        axios.get(
          `https://hrf-asylum-be-b.herokuapp.com/cases/citizenshipSummary`
        ),
      ]);

      let data = firstResponse.data;
      data.citizenshipResults = secondResponse.data;
      dispatch(setData(data));
      stateSettingCallback(view, office, data);
    }
  }
  const clearQuery = (view, office) => {
    dispatch(resetVisualizationQuery(view, office));
  };
  return (
    <div
      className="map-wrapper-container"
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        minHeight: '50px',
        backgroundColor: background_color,
      }}
    >
      <ScrollToTopOnMount />
      {map_to_render}
      <div
        className="user-input-sidebar-container"
        style={{
          width: '300px',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <ViewSelect set_view={set_view} />
        <YearLimitsSelect
          view={view}
          office={office}
          clearQuery={clearQuery}
          updateStateWithNewData={updateStateWithNewData}
        />
      </div>
    </div>
  );
}

export default connect()(GraphWrapper);
