package io.itrunner.heroes;

import io.itrunner.heroes.data.HeroService;
import ohos.ace.ability.AceInternalAbility;
import ohos.app.AbilityContext;
import ohos.hiviewdfx.HiLog;
import ohos.hiviewdfx.HiLogLabel;
import ohos.rpc.IRemoteObject;
import ohos.rpc.MessageOption;
import ohos.rpc.MessageParcel;
import ohos.rpc.RemoteException;
import ohos.utils.zson.ZSONObject;

import static ohos.utils.zson.ZSONObject.toZSONString;

public class HeroServiceInternalAbility extends AceInternalAbility {
    private static final String TAG = HeroServiceInternalAbility.class.getSimpleName();
    private static final HiLogLabel LOG_LABEL = new HiLogLabel(HiLog.LOG_APP, 0x00102, TAG);

    private static final String BUNDLE_NAME = "io.itrunner.heroes";
    private static final String ABILITY_NAME = "io.itrunner.heroes.HeroServiceInternalAbility";
    private static final int ERROR = -1;
    private static final int SUCCESS = 0;

    private static HeroServiceInternalAbility instance;
    private HeroService heroService;

    /* 如果多个Ability实例都需要注册当前InternalAbility实例，需要更改构造函数，设定自己的bundleName和abilityName */
    public HeroServiceInternalAbility() {
        super(BUNDLE_NAME, ABILITY_NAME);
    }

    private boolean onRemoteRequest(int code, MessageParcel data, MessageParcel reply, MessageOption option) {
        HiLog.info(LOG_LABEL, "onRemoteRequest");

        ZSONObject zsonResult = new ZSONObject();
        try {
            Object result = heroService.onRemoteRequest(code, data);

            zsonResult.put("code", SUCCESS);
            if (result != null) {
                zsonResult.put("result", result);
            }
        } catch (Exception e) {
            HiLog.error(LOG_LABEL, e.getMessage());

            zsonResult.put("code", ERROR);
            zsonResult.put("message", e.getMessage());
            reply.writeString(toZSONString(zsonResult));
            return false;
        }

        // SYNC
        if (option.getFlags() == MessageOption.TF_SYNC) {
            reply.writeString(toZSONString(zsonResult));
        } else {
            // ASYNC
            MessageParcel responseData = MessageParcel.obtain();
            responseData.writeString(toZSONString(zsonResult));

            IRemoteObject remoteReply = reply.readRemoteObject();
            try {
                remoteReply.sendRequest(0, responseData, MessageParcel.obtain(), new MessageOption());
                responseData.reclaim();
            } catch (RemoteException exception) {
                HiLog.error(LOG_LABEL, exception.getMessage());
                return false;
            }
        }
        return true;
    }

    /**
     * Internal ability registration
     */
    public static void register(AbilityContext abilityContext) {
        instance = new HeroServiceInternalAbility();
        instance.onRegister(abilityContext);
    }

    private void onRegister(AbilityContext abilityContext) {
        this.heroService = new HeroService(abilityContext);
        this.setInternalAbilityHandler(this::onRemoteRequest);
    }

    /**
     * Internal ability deregistration
     */
    public static void deregister() {
        instance.onDeregister();
    }

    private void onDeregister() {
        heroService = null;
        this.setInternalAbilityHandler(null);
    }
}