
interface Model {

}
const state: Model = {
}

type Subscription = (model:Model) => void

const followers: Subscription[] = []

function subscribe(subscription: Subscription) {
    followers.push(subscription)
}
const handler: ProxyHandler<Model> = {
    get(target, prop, receiver) {
        return Reflect.get(target, prop, receiver);
    },
    set(model: Model, p: string | symbol, newValue: any, receiver: any) {
        const success = Reflect.set(model, p, newValue, receiver)
        followers.forEach(follower => follower(model))
        return success
    }
}

const model = new Proxy(state, handler)

export { model, Model, subscribe }
