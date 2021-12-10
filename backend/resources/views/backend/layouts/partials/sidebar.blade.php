<nav class="sidebar">
    <div class="sidebar-header">
      <a href="javascript:void(0)" class="sidebar-brand">
        মানবতার<span> ঘর</span>
      </a>
      <div class="sidebar-toggler not-active">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
    <div class="sidebar-body">
      <ul class="nav">
        <li class="nav-item nav-category">{{trans('common.sidebarslot1')}}</li>
        <li class="nav-item">
          <a href="{{route('backend.dashboard')}}" class="nav-link">
            <i class="link-icon" data-feather="box"></i>
            <span class="link-title">{{trans('common.dashboard')}}</span>
          </a>
        </li>
        <li class="nav-item nav-category">{{trans('common.sidebarslot2')}}</li>
        <li class="nav-item">
          <a class="nav-link" data-toggle="collapse" href="#money" role="button" aria-expanded="false" aria-controls="money">
            <i class="link-icon" data-feather="dollar-sign"></i>
            <span class="link-title">{{trans('project.money')}}</span>
            <i class="link-arrow" data-feather="chevron-down"></i>
          </a>
          <div class="collapse" id="money">
            <ul class="nav sub-menu">
              <li class="nav-item">
                <a href="{{route('backend.money.list')}}" class="nav-link">{{trans('common.list')}}</a>
              </li>
            </ul>
          </div>
        </li>

        <li class="nav-item">
            <a class="nav-link" data-toggle="collapse" href="#foods" role="button" aria-expanded="false" aria-controls="foods">
              <i class="link-icon" data-feather="gift"></i>
              <span class="link-title">{{trans('project.foods')}}</span>
              <i class="link-arrow" data-feather="chevron-down"></i>
            </a>
            <div class="collapse" id="foods">
              <ul class="nav sub-menu">
                <li class="nav-item">
                  <a href="pages/email/fx.html" class="nav-link">{{trans('common.list')}}</a>
                </li>
              </ul>
            </div>
        </li>
        <li class="nav-item">
          <a href="pages/apps/cx" class="nav-link">
            <i class="link-icon" data-feather="message-square"></i>
            <span class="link-title">Example</span>
          </a>
        </li>

        <li class="nav-item">
            <a class="nav-link" data-toggle="collapse" href="#users" role="button" aria-expanded="false" aria-controls="users">
              <i class="link-icon" data-feather="users"></i>
              <span class="link-title">{{trans('auth.users')}}</span>
              <i class="link-arrow" data-feather="chevron-down"></i>
            </a>
            <div class="collapse" id="users">
              <ul class="nav sub-menu">
                <li class="nav-item">
                  <a href="pages/email/mx.html" class="nav-link">{{trans('common.member')}}</a>
                </li>
                <li class="nav-item">
                    <a href="pages/email/mx.html" class="nav-link">{{trans('common.admin')}}</a>
                  </li>
                  <li class="nav-item">
                    <a href="pages/email/mx.html" class="nav-link">{{trans('common.volunteer')}}</a>
                  </li>
                  <li class="nav-item">
                    <a href="pages/email/mx.html" class="nav-link">{{trans('common.donor')}}</a>
                  </li>

                  <li class="nav-item">
                    <a href="pages/email/mx.html" class="nav-link">{{trans('common.donar')}}</a>
                  </li>

              </ul>
            </div>
          </li>

      </ul>
    </div>
  </nav>
  <nav class="settings-sidebar">
    <div class="sidebar-body">
      <a href="javascript:void(0)" class="settings-sidebar-toggler">
        <i data-feather="settings"></i>
      </a>
      <h6 class="text-muted">Sidebar:</h6>
      <div class="form-group border-bottom">
        <div class="form-check form-check-inline">
          <label class="form-check-label">
            <input type="radio" class="form-check-input" name="sidebarThemeSettings" id="sidebarLight" value="sidebar-light" checked>
            Light
          </label>
        </div>
        <div class="form-check form-check-inline">
          <label class="form-check-label">
            <input type="radio" class="form-check-input" name="sidebarThemeSettings" id="sidebarDark" value="sidebar-dark">
            Dark
          </label>
        </div>
      </div>
    </div>
  </nav>
