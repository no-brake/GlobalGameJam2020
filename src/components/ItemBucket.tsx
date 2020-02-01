import * as React from "react"

export interface ItemBucketProps {}
export interface ItemBucketState {}


export class ItemBucket extends React.Component<ItemBucketProps, ItemBucketState>{
    render(){
        return (
            <div>
                Bucket
            </div>
        )
    }
}