import { useContext } from 'react';
import Dialog from '../styled/Dialog';
import { ChoiceContext, ProductionChoiceActions } from '../../contexts/ModalContext';
import { IShoeWeight } from '../../types/production';
import Add3rdWeightForm from '../forms/Add3rdWeightForm';
import { Image } from 'react-native';


function Add3rdWeightDialog({ shoeweight }: { shoeweight: IShoeWeight }) {
    const { choice, setChoice } = useContext(ChoiceContext)
    return (
        <>
            <Dialog fullScreen visible={choice === ProductionChoiceActions.create_showweight3 ? true : false} handleClose={() => setChoice({ type: ProductionChoiceActions.close_production })}
            >
                {!shoeweight.shoe_weight3 ? <Add3rdWeightForm shoeweight={shoeweight} /> :

                    <Image style={{ flex: 1, height: '100%', width: '100%' }} source={{ uri: shoeweight.shoe_photo3?.public_url }} />}

            </Dialog>
        </>
    )
}

export default Add3rdWeightDialog


