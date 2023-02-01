import React from "react";
import styled from "styled-components";

const TestAllRegionList = ({
  regionTheaters,
  selectedTheater,
  setSelectedTheater,
}) => {
  const selectTheater = (theater_id) => {
    const selectedObject = regionTheaters.find(({ tid }) => tid === theater_id);
    setSelectedTheater(selectedObject.tid);
  };

  return (
    <RegionTheatersListWrapper>
      {regionTheaters.map((item) => {
        return (
          <RegionItem
            key={item.tid}
            regionId={item.tid}
            regionTheatersId={selectedTheater}
          >
            <div
              onClick={() => selectTheater(item.tid)}
              regionId={item.tid}
              regionTheatersId={selectedTheater}
            >
              {item.name}
            </div>
          </RegionItem>
        );
      })}
    </RegionTheatersListWrapper>
  );
};

export default TestAllRegionList;

const RegionTheatersListWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const RegionItem = styled.div`
  display: flex;
  padding-bottom: 7px;
  background-color: ${(props) =>
    props.regionId === props.regionTheatersId ? "gray" : "white"};
  > div {
    padding: 6px 70px 5px 10px;
    font-size: 13px;
    color: ${(props) =>
      props.regionId === props.regionTheatersId ? "white" : "black"};
  }
`;
