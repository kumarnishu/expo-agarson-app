import { useContext } from 'react';
import Dialog from '../styled/Dialog';
import { ChoiceContext, ProductionChoiceActions } from '../../contexts/ModalContext';
import { IShoeWeight } from '../../types/production';
import Add2ndWeightForm from '../forms/Add2ndWeightForm';
import { Image, View } from 'react-native';


function Add2ndWeightDialog({ shoeweight }: { shoeweight: IShoeWeight }) {
    const { choice, setChoice } = useContext(ChoiceContext)
    return (
        <>
            <Dialog fullScreen visible={choice === ProductionChoiceActions.create_showweight2 ? true : false} handleClose={() => setChoice({ type: ProductionChoiceActions.close_production })}
            >
                
                {!shoeweight.shoe_weight2? <Add2ndWeightForm shoeweight={shoeweight} /> :

                    <Image style={{ flex: 1, height: '100%', width: '100%' }} source={{ uri: shoeweight.shoe_photo2?.public_url }} />}


            </Dialog>
        </>
    )
}

export default Add2ndWeightDialog


