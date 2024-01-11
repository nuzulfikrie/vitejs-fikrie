import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';

interface ModalProps {
    visible: boolean;
    onHide: () => void;
    // Add any other props you need
    articleTitle: string;
    courseId: string;
    year: string;
    journalName?: string;
    location?: string;
    volume?: string;
    issue?: string;
    page?: string;
    author: string;
    doi?: string;
    pii?: string;



    articleAbout: string;

    articleDoesNotSupportStudy: string;
}
/**
 * 
 * @param param0 <?php
$buttonCell = $this->cell(
  'Videos::videoDisplayJs',
  [
    $key,
    $this->request->getSession()->read("Auth.User.id")
  ]
);
?>

<div class="panel panel-border border-top panel-danger mb40 mt5">

  <?php echo  $this->Form->create(
    null,
    [
      'id' => 'editJournalForm',

    ]
  ); ?>
  <div class="panel-heading fill">
    <span class="panel-title"><?php echo  __('Journal Details') ?></span>
  </div>
  <div class="panel-body p20 pb10">
    <div class="col-md-8" id="videoplace" style="display: none" ;>
      <?php echo $buttonCell; ?>
    </div>


    <div class="alert alert-danger alert-dismissable" style="display:none">
      <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
      <i class="fa fa-remove pr10"></i>
      <strong id="alert_text"></strong>
    </div>
    <div class="col-md-12">
      <div class="btn-group">
        <button class="btn btn-dark btn-md" id="viewVideo"><i class="fa fa-video"></i><?php echo __(' View Video ') ?></button>

        <button class="retrieve-abstract btn btn-primary btn-md">
          <?php echo __("Retrieve Abstract") ?></button>
        <div class="btn-group">

          <button type="button" class="btn btn-primary btn-md" id="dropdown-button">
            <?php echo __("SELECT PROVIDER") ?></button>
          <button type="button" class="btn  btn-primary btn-md dropdown-toggle" data-toggle="dropdown">
            <span class="caret"></span>
          </button>
          <ul class="dropdown-menu">
            <li><a href="#" data-value="elsevier">ELSEVIER</a></li>
            <li><a href="#" data-value="pubmed">PUBMED</a></li>
            <li><a href="#" data-value="ieee">IEEE</a></li>
            <li><a href="#" data-value="springer">SPRINGER</a></li>

            <li><a href="#" data-value="reset">RESET</a></li>

          </ul>
        </div>


      </div>
    </div>
    <div class="col-md-8">
      <?php echo  $this->Form->control(
        "doi",
        [
          'id' => 'doi',

          'label' => [
            'DOI',
            ['id' => 'doi_label']
          ],

          'class' => 'gui-input hasButton'
        ]
      ); ?>
      <button type="button" class="ui-doi-trigger btn-primary">
        <i class="fa-solid fa-d"></i>
        <i class="fa-solid fa-o"></i>
        <i class="fa-solid fa-i"></i>
        Retrieve metadata
      </button>
    </div>

    <div class="col-md-8">
      <?php echo  $this->Form->control(
        "author",
        [
          'type' => 'text',
          'placeholder' => __('In this format Karen Yang,
David Martinez,
Liza Beth'),

          'data-toggle' => 'tooltip',

          'title' => 'In this format [first name last name,
 second author first name second author last name] Karen Yang,
David Martinez,
Liza Beth',

        ]
      ); ?>
    </div>
    <div class="col-md-12"><?php echo  $this->Form->control(
                              "article_title",
                              [
                                'type' => 'text',

                                'id' => 'article_title',

                                'onchange' => 'trim(this)'
                              ]
                            ); ?></div>


    <div class="col-md-8">
      <?php echo  $this->Form->control(
        "year",
        ['id' => 'year']
      ); ?>
    </div>

    <div class="col-md-8">
      <?php echo  $this->Form->control("journal_name"); ?>
    </div>
    <div class="col-md-8">
      <?php echo  $this->Form->control(
        "location",
        ['type' => 'text']
      ); ?>
    </div>
    <div class="col-md-8">
      <?php echo  $this->Form->control("volume"); ?>
    </div>
    <div class="col-md-8">
      <?php echo  $this->Form->control("issue"); ?>
    </div>

    <div class="col-md-8">
      <?php echo  $this->Form->control("page"); ?>
    </div>

    <div class="col-md-12">
      <div class="btn-group">
        <button class="insert-template btn btn-primary btn-md"><?php echo __("Insert Template") ?></button>
      </div>
    </div>

    <div class="col-md-12" id="abstract-panel" style="display: none;">
      <div class=" panel-heading fill">
        <span class="panel-icon">
          <i class="fa fa-book"></i>
        </span>
        <span class="panel-title">
          <?php echo  __("ABSTRACT") ?></span>
      </div>
      <div class="panel-body" id="abstract-body" style="text-align:justify;"></div>
    </div>

  </div>

  <div class="panel">
    <div class="panel-heading">
      <span class="panel-title hidden-xs"><?php echo  __('Journal Strength,
POD') ?></span>
    </div>
    <div class="panel-body p20 pb10">

      <div class="col-md-8">
        <div class="row">
          <div class="col-xs-10 col-md-10">
            <?php echo  $this->Form->control(
              "article_about.content",
              [
                'type' => 'textarea',
                'rows' => '2',
                'label' => __('What is the article about and author\'s point of departure ?'),
                'style' => 'color:' . $journal_color['author_pod_color'] . ';border-color:' . $journal_color['author_pod_color']
              ]
            ); ?>
          </div>
          <div class="col-xs-2 col-md-2">
            <?php echo  $this->Form->control(
              "article_about.page",
              ['id' => 'article_about_page']
            ); ?>
          </div>
        </div>

        <div class="row">
          <div class="col-xs-10 col-md-10">
            <?php echo  $this->Form->control(
              "article_support_study.content",
              [
                'type' => 'textarea',
                'rows' => '2',
                'label' => __('How the article support your study ?'),
                'style' => 'color:' . $journal_color['article_support_study_color'] . ';border-color:' . $journal_color['article_support_study_color']
              ]
            ); ?>
          </div>
          <div class="col-xs-2 col-md-2">
            <?php echo  $this->Form->control(
              "article_support_study.page",
              ['id' => 'article_support_page']
            ); ?>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-10 col-md-10">
            <?php echo  $this->Form->control(
              "article_does_not_support_study.content",
              [
                'type' => 'textarea',

                'rows' => '2',

                'label' => __('How the article does not support your study ?'),
                'style' => 'color:' . $journal_color['article_dontsupport_study_color'] . ';border-color:' . $journal_color['article_dontsupport_study_color']
              ]
            ); ?>
          </div>
          <div class="col-xs-2 col-md-2">
          </div>
        </div>
        <div class="row">
          <div class="col-xs-10 col-md-10">
            <?php echo  $this->Form->control(
              "needed_support_study.content",
              [
                'type' => 'textarea',

                'rows' => '2',

                'label' => __('What else is needed to support your study ? (Your POD)'),
                'style' => 'color:' . $journal_color['your_pod_color'] . ';border-color:' . $journal_color['your_pod_color']
              ]
            ); ?>
          </div>
          <div class="col-xs-2 col-md-2">
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <table class="table">
          <thead>
            <tr>
              <th><?php echo  __("RQ Construct"); ?>
              </th>
              <th><?php echo  __("Sub Theme"); ?>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><?php echo __('No Selection'); ?>
              </td>
              <td>
                <div class="form-group">
                  <div class="form-check form-check-inline">
                    <?php echo $this->Form->checkbox('step06[]', ['hiddenField' => false, 'checked' => '', 'value' =>  "no_selection", 'id' => 'no_selection', 'class' => 'form-check-input']); ?>
                    <label for="<?php echo  __('No selection') ?> class=" form-check-label"><?php echo  __('No selection') ?></label>
                  </div>

                </div>
              </td>
            </tr>
            <?php

            foreach ($rq_construct_list as $key => $value) {
              $keyArr = explode('_', $key);
              if (isset($keyArr[1])) {
                $KeyDisplay = strtoupper($keyArr[0]) . " " . strtoupper($keyArr[1]);
              } else {
                $KeyDisplay = strtoupper($keyArr[0]);
              }
            ?>
              <tr>

                <td><?php echo $KeyDisplay . ":" . $rq_construct_list[$key]; ?>
                </td>
                <td>
                  <div class="form-group">


                    <?php
                    if (isset($subthemes[$key])) {
                      foreach ($subthemes[$key] as $subtheme_id => $row) {
                        //  echo $this->Form->control("step_06." . $key . "." . $subtheme_id, ['class' => 'subRqConstruct', 'type' => 'checkbox', 'checked' => false, 'label' => $row, 'disabled' => true]);
                    ?>
                        <div class="form-check form-check-inline">
                          <?php echo $this->Form->checkbox('step06[]', ['hiddenField' => false, 'checked' => '', 'value' =>  $key . "_" . $subtheme_id, 'id' => $key . "_" . $subtheme_id,  'class' => 'form-check-input']); ?>
                          <label for="<?php echo  $key . "_" . $subtheme_id ?>" class="form-check-label"><?php echo  $row ?></label>
                        </div>

                      <?php  } ?>
                    <?php }
                    ?>
                  </div>
                </td>
              </tr>


              <!--
                        <div class="form-group" -->
            <?php


            }

            ?>
          </tbody>
        </table>
      </div>
      <?php
      //hidden field for step 06 courses id
      echo  $this->Form->control(
        "course_id",
        [
          'type' => 'hidden',

          'value' => $course->id
        ]
      ); ?>
      <?php echo  $this->Form->end(); ?>


    </div>
  </div>
</div>
 * @returns 
 */
const EditJournalModal: React.FC<ModalProps> = ({ visible, onHide }) => {
    // Add your state variables here
    const [doi, setDoi] = useState('');
    const [author, setAuthor] = useState('');
    const [articleTitle, setArticleTitle] = useState('');
    const [courseId, setCourseId] = useState('');
    const [year, setYear] = useState('');
    const [journalName, setJournalName] = useState('');
    const [location, setLocation] = useState('');
    const [volume, setVolume] = useState('');
    const [issue, setIssue] = useState('');
    const [page, setPage] = useState('');
    const [articleAbout, setArticleAbout] = useState('');
    const [articleSupportStudy, setArticleSupportStudy] = useState('');
    const [articleDoesNotSupportStudy, setArticleDoesNotSupportStudy] = useState('');
    const [neededSupportStudy, setNeededSupportStudy] = useState('');
    const [subTheme, setSubTheme] = useState([]);

    // Add other state variables

    // Add your event handlers and logic here

    return (
        <Dialog visible={visible} onHide={onHide}>
            {/* Add your modal content here */}
            <div className="panel-body p20 pb10">
                {/* Add your form inputs and buttons here */}
                {/* Use the state variables and event handlers */}
            </div>
        </Dialog>
    );
};

export default EditJournalModal;
