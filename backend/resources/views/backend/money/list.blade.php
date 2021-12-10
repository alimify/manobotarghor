
@extends('backend.layouts.app')

@section('title','মানবতার ঘর')

@section('content')


    <nav class="page-breadcrumb">
        <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="#">{{trans('project.money')}}</a></li>
            <li class="breadcrumb-item active" aria-current="page">{{trans('common.list')}}</li>
        </ol>
    </nav>

    <div class="row">
        <div class="col-md-12 grid-margin stretch-card">
<div class="card">
  <div class="card-body">
    <div class="table-responsive">
      <table id="dataTableExample" class="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        @foreach($moneyRequests as $mr)
          <tr>
            <td>{{$mr->name}}</td>
            <td>{{$mr->phone}}</td>
            <td>{{$mr->location_id}}</td>
            <td>{{$mr->amount}}</td>
            <td>status</td>
            <td>2011/04/25</td>
            <td>V</td>
          </tr>
        @endforeach
        </tbody>
      </table>
    </div>
  </div>
</div>
        </div>
    </div>
@endsection


@push('css')
  <!-- plugin css for this page -->
  <link rel="stylesheet" href="{{asset('backend/assets/vendors/datatables.net-bs4/dataTables.bootstrap4.css')}}">
@endpush

@push('script')
  <!-- plugin js for this page -->
  <script src="{{asset('backend/assets/vendors/datatables.net/jquery.dataTables.js')}}"></script>
  <script src="{{asset('backend/assets/vendors/datatables.net-bs4/dataTables.bootstrap4.js')}}"></script>

<script>
$(function() {
  'use strict';

  $(function() {
    $('#dataTableExample').DataTable({
      "aLengthMenu": [
        [10, 30, 50, -1],
        [10, 30, 50, "All"]
      ],
      "iDisplayLength": 10,
      "language": {
        search: ""
      }
    });
    $('#dataTableExample').each(function() {
      var datatable = $(this);
      // SEARCH - Add the placeholder for Search and Turn this into in-line form control
      var search_input = datatable.closest('.dataTables_wrapper').find('div[id$=_filter] input');
      search_input.attr('placeholder', 'Search');
      search_input.removeClass('form-control-sm');
      // LENGTH - Inline-Form control
      var length_sel = datatable.closest('.dataTables_wrapper').find('div[id$=_length] select');
      length_sel.removeClass('form-control-sm');
    });
  });

});
</script>
@endpush
