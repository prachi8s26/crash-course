import React from 'react';
import './StateBar.scss';
import {Data, FileType, ImageData} from "../../../store/labels/types";
import {AppState} from "../../../store";
import {connect} from "react-redux";
import {LabelType} from "../../../data/enums/LabelType";

interface IProps {
    data: Data[];
    activeLabelType: LabelType;
}

const StateBar: React.FC<IProps> = ({data: data, activeLabelType}) => {

    if(data.some(d => d.fileType === FileType.VIDEO)){
        return <div></div>
    }
    
    var imageData: ImageData[] =  data as ImageData[]

    const pointLabeledImages = imageData.reduce((currentCount: number, currentImage: ImageData) => {
        return currentCount + (currentImage.labelPoints.length > 0 ? 1 : 0);
    }, 0);

    const rectLabeledImages = imageData.reduce((currentCount: number, currentImage: ImageData) => {
        return currentCount + (currentImage.labelRects.length > 0 ? 1 : 0);
    }, 0);

    const polygonLabeledImages = imageData.reduce((currentCount: number, currentImage: ImageData) => {
        return currentCount + (currentImage.labelPolygons.length > 0 ? 1 : 0);
    }, 0);

    const lineLabeledImages = imageData.reduce((currentCount: number, currentImage: ImageData) => {
        return currentCount + (currentImage.labelLines.length > 0 ? 1 : 0);
    }, 0);

    const tagLabeledImages = imageData.reduce((currentCount: number, currentImage: ImageData) => {
        return currentCount + (currentImage.labelNameIds.length !== 0 ? 1 : 0);
    }, 0);

    const getProgress = () => {
        switch (activeLabelType) {
            case LabelType.POINT:
                return (100 * pointLabeledImages) / data.length;
            case LabelType.RECT:
                return (100 * rectLabeledImages) / data.length;
            case LabelType.POLYGON:
                return (100 * polygonLabeledImages) / data.length;
            case LabelType.LINE:
                return (100 * lineLabeledImages) / data.length;
            case LabelType.IMAGE_RECOGNITION:
                return (100 * tagLabeledImages) / data.length;
            default:
                return 0;
        }
    };

    return (
        <div className="StateBar">
            <div
                style={{width: getProgress() + "%"}}
                className="done"
            />
        </div>
    );
};

const mapDispatchToProps = {};

const mapStateToProps = (state: AppState) => ({
    data: state.labels.imagesData,
    activeLabelType: state.labels.activeLabelType
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StateBar);